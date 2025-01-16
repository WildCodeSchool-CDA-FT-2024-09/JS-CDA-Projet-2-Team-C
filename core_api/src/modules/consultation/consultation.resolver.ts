import {
  Consultation,
  ConsultationSubject,
  Patient,
  RoleCode,
  User
} from '../entities.index';
import { Resolver, Query, Arg, Authorized, Mutation } from 'type-graphql';
import { Between } from 'typeorm';

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
  @Query(() => [Consultation])
  async consultationsByDoctorId(@Arg('doctorId') doctorId: string) {
    return await Consultation.find({
      where: { doctor: { id: doctorId } },
      order: { consultationDate: 'DESC', startTime: 'DESC' },
      relations: {
        doctor: { department: true },
        subject: true,
        patient: { gender: true }
      }
    });
  }

  @Authorized([RoleCode.AGENT])
  @Query(() => [Consultation])
  async restrictedConsultationsByDoctorId(@Arg('doctorId') doctorId: string) {
    const now = new Date();

    const timePlus55Min = new Date(now);
    timePlus55Min.setMinutes(timePlus55Min.getMinutes() + 55);
    const timePlus55MinString = timePlus55Min
      .toISOString()
      .split('T')[1]
      .slice(0, 5); // Format "HH:mm:ss"

    const timePlus3Hours = new Date(now);
    timePlus3Hours.setHours(timePlus3Hours.getHours() + 3);
    const timePlus3HoursString = timePlus3Hours
      .toISOString()
      .split('T')[1]
      .slice(0, 5); // Format "HH:mm:ss"

    const todayDateString = now.toISOString().split('T')[0]; // "YYYY-MM-DD" format
    const startDateTime = new Date(`${todayDateString}T${timePlus55MinString}`);
    const endDateTime = new Date(`${todayDateString}T${timePlus3HoursString}`);

    const startTimeFilter = timePlus55MinString;
    const endTimeFilter = timePlus3HoursString;

    return await Consultation.find({
      where: {
        doctor: { id: doctorId },
        consultationDate: Between(startDateTime, endDateTime),
        startTime: Between(startTimeFilter, endTimeFilter)
      },
      order: { consultationDate: 'DESC', startTime: 'ASC' },
      relations: {
        doctor: { department: true },
        patient: true
      }
    });
  }

  @Authorized([RoleCode.SECRETARY])
  @Mutation(() => Consultation)
  async createConsultation(
    @Arg('doctorId') doctorId: string,
    @Arg('subjectLabel') subjectLabel: string,
    @Arg('patientId') patientId: string, // TODO : this shall become nullable when we have the patient creation
    @Arg('start') start: Date, // important : these two need to be ISOstrings.
    @Arg('end') end: Date,
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

      return newConsultation;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Erreur indéterminée';
      throw new Error(errorMessage);
    }
  }
}
