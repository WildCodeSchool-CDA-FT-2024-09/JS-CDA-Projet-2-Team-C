import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Mutation,
  UseMiddleware,
  Ctx
} from 'type-graphql';
import { Between, FindOperator } from 'typeorm';
import {
  Consultation,
  ConsultationSubject,
  Patient,
  RoleCode,
  User
} from '../entities.index';
import { WithCache } from '../../services/cache/cacheMiddleware';
import cacheClient from '../../services/cache/cacheService';
import { ContextType } from '../../types/ContextType';
import { CreateConsultationInput } from './consultation.input';

@Resolver(Consultation)
export default class ConsultationResolver {
  @Authorized([RoleCode.DOCTOR])
  @Query(() => [Consultation])
  async dossier(@Arg('patientId') patientId: string) {
    return await Consultation.find({
      where: { patient: { id: patientId } },
      order: { consultationDate: 'DESC', startTime: 'DESC' },
      relations: {
        doctor: { department: true },
        attachments: { author: { role: true } },
        subject: true,
        patient: { gender: true }
      }
    });
  }

  // TODO : talk amongst ourselves on how to restrict the dates ? Maybe refetch based on the calendar's view ?
  // in this case, it should also take a end date
  @Authorized([RoleCode.DOCTOR, RoleCode.SECRETARY])
  // Demo of Redis caching with `WithCache` middleware
  @UseMiddleware(
    WithCache<{ doctorId: string }>({
      key: (args) => `consultationsByDoctorId:${args.doctorId}`,
      ttl: 60
    })
  )
  @Query(() => [Consultation])
  async consultationsByDoctorId(@Arg('doctorId') doctorId: string) {
    const result = await Consultation.find({
      where: { doctor: { id: doctorId } },
      order: { consultationDate: 'DESC', startTime: 'DESC' },
      relations: {
        doctor: { department: true },
        subject: true,
        patient: { gender: true }
      }
    });

    return result;
  }

  @Authorized([RoleCode.AGENT])
  @Query(() => [Consultation])
  async restrictedConsultations(
    @Arg('doctorId', { nullable: true }) doctorId?: string,
    @Arg('ssn', { nullable: true }) ssn?: string
  ) {
    if (!doctorId && !ssn) {
      throw new Error("Vous devez fournir soit un 'doctorId', soit un 'ssn'.");
    }

    const now = new Date();
    const timePlus55Min = new Date(now);
    timePlus55Min.setMinutes(timePlus55Min.getMinutes() + 55);
    const timePlus55MinString = timePlus55Min
      .toISOString()
      .split('T')[1]
      .slice(0, 5);

    const timePlus3Hours = new Date(now);
    timePlus3Hours.setHours(timePlus3Hours.getHours() + 3);
    const timePlus3HoursString = timePlus3Hours
      .toISOString()
      .split('T')[1]
      .slice(0, 5);

    const todayDateString = now.toISOString().split('T')[0];
    const startDateTime = new Date(`${todayDateString}T${timePlus55MinString}`);
    const endDateTime = new Date(`${todayDateString}T${timePlus3HoursString}`);

    const startTimeFilter = timePlus55MinString;
    const endTimeFilter = timePlus3HoursString;

    let patient;
    if (ssn) {
      patient = await Patient.findOne({
        where: { ssn }
      });

      if (!patient) {
        throw new Error('Patient introuvable');
      }
    }

    const whereCondition: {
      consultationDate?: FindOperator<Date>;
      startTime?: FindOperator<string>;
      doctor?: { id: string };
      patient?: { id: string };
    } = {
      consultationDate: Between(startDateTime, endDateTime),
      startTime: Between(startTimeFilter, endTimeFilter)
    };

    if (doctorId) {
      whereCondition.doctor = { id: doctorId };
    }

    if (ssn && patient) {
      whereCondition.patient = { id: patient.id };
    }

    const consultations = await Consultation.find({
      where: whereCondition,
      order: { consultationDate: 'DESC', startTime: 'ASC' },
      relations: {
        doctor: { department: true },
        patient: true
      }
    });

    return consultations;
  }

  @Authorized([RoleCode.SECRETARY])
  @Mutation(() => Consultation)
  async createConsultation(
    @Ctx() context: ContextType,
    @Arg('consultationDetails') consultationDetails: CreateConsultationInput
  ): Promise<Consultation> {
    try {
      const { doctorId, patientId, subjectLabel, start, end, description } =
        consultationDetails;

      const doctor = await User.findOne({ where: { id: doctorId } });
      if (!doctor) throw new Error(`Ce médecin n'existe pas`);

      const patient = await Patient.findOne({ where: { id: patientId } });
      if (!patient) throw new Error(`Ce patient n'existe pas`);

      const subject = await ConsultationSubject.findOne({
        where: { label: subjectLabel }
      });
      if (!subject) throw new Error(`Ce motif n'existe pas`);

      const startDate = new Date(start);
      const endDate = new Date(end);

      const startTime = startDate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const durationMinutes = (endDate.getTime() - startDate.getTime()) / 60000;

      if (durationMinutes < 0)
        throw new Error('La durée de la consultation est négative');
      //TODO : maybe perform some other checks here, like if the doctor is available at this time, etc.

      const { user } = context;

      const newConsultation = new Consultation();
      newConsultation.doctor = doctor;
      newConsultation.patient = patient;
      newConsultation.consultationDate = startDate;
      newConsultation.startTime = startTime;
      newConsultation.durationMinutes = durationMinutes;
      newConsultation.subject = subject;
      newConsultation.description = description;
      newConsultation.author = user as User; // user is always defined because we're inside a @authorized() resolver

      await newConsultation.save();

      // Invalidate the cache for this doctor's consultations
      cacheClient.del('consultationsByDoctorId:' + doctorId);

      return newConsultation;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Erreur indéterminée';
      throw new Error(errorMessage);
    }
  }
}
