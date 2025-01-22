import {
  Consultation,
  ConsultationSubject,
  Patient,
  RoleCode,
  User
} from '../entities.index';
import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Mutation,
  UseMiddleware
} from 'type-graphql';
import { Between, FindOperator } from 'typeorm';
import { WithCache } from '../../services/cache/cacheMiddleware';
import cacheClient from '../../services/cache/cacheService';

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
      ttl: 60,
      refreshOnHit: false
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
    const utcNow = new Date(now.toISOString());

    const minus5MinutesUTC = new Date(utcNow);
    minus5MinutesUTC.setMinutes(utcNow.getMinutes() - 5);
    const minus5MinutesString = minus5MinutesUTC.toTimeString().split(' ')[0];

    const plus2HoursUTC = new Date(utcNow);
    plus2HoursUTC.setHours(utcNow.getHours() + 2);
    const plus2HoursString = plus2HoursUTC.toTimeString().split(' ')[0];

    const todayStart = new Date(utcNow);
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayEnd = new Date(utcNow);
    todayEnd.setUTCHours(23, 59, 59, 999);

    let patient;
    if (ssn) {
      patient = await Patient.findOne({ where: { ssn } });
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
      consultationDate: Between(todayStart, todayEnd),
      startTime: Between(minus5MinutesString, plus2HoursString)
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
    @Arg('doctorId') doctorId: string,
    @Arg('subjectLabel') subjectLabel: string,
    @Arg('patientId') patientId: string, // TODO : this shall become nullable when we have the patient creation
    @Arg('start') start: string, // important : these two need to be ISOstrings.
    @Arg('end') end: string,
    @Arg('description') description: string
  ): Promise<Consultation> {
    try {
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

      const newConsultation = new Consultation();
      newConsultation.doctor = doctor;
      newConsultation.patient = patient;
      newConsultation.consultationDate = startDate;
      newConsultation.startTime = startTime;
      newConsultation.durationMinutes = durationMinutes;
      newConsultation.subject = subject;
      newConsultation.description = description;
      //TODO : need to extract the author from the token

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
