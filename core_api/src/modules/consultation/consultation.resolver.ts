import { Consultation, RoleCode, Patient } from '../entities.index';
import { Resolver, Query, Arg, Authorized } from 'type-graphql';
import { Between, FindOperator } from 'typeorm';

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
}
