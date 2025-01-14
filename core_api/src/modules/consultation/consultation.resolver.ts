import { Consultation } from '../entities.index';
import { Resolver, Query, Arg } from 'type-graphql';
import { Between } from 'typeorm';

@Resolver(Consultation)
export default class ConsultationResolver {
  // TODO : rescrtict access to role === doctor
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
  @Query(() => [Consultation])
  async restrictedConsultationsByDoctorId(@Arg('doctorId') doctorId: string) {
    const now = new Date();

    // Log après l'ajout de 55 minutes
    const timePlus55Min = new Date(now);
    timePlus55Min.setMinutes(timePlus55Min.getMinutes() + 55);
    const timePlus55MinString = timePlus55Min
      .toISOString()
      .split('T')[1]
      .slice(0, 8); // Format "HH:mm:ss"
    // console.log('Heure après ajout de 55 minutes:', timePlus55MinString);

    // Log après l'ajout de 3 heures
    const timePlus3Hours = new Date(now);
    timePlus3Hours.setHours(timePlus3Hours.getHours() + 3);
    const timePlus3HoursString = timePlus3Hours
      .toISOString()
      .split('T')[1]
      .slice(0, 8); // Format "HH:mm:ss"
    //console.log('Heure après ajout de 3 heures:', timePlus3HoursString);

    // Construire la date complète d'aujourd'hui avec startTime pour la comparaison
    const todayDateString = now.toISOString().split('T')[0]; // "YYYY-MM-DD" format
    const startDateTime = new Date(`${todayDateString}T${timePlus55MinString}`);
    const endDateTime = new Date(`${todayDateString}T${timePlus3HoursString}`);

    // Convertir l'heure dans le format "HH:mm:ss" pour startTime (string)
    const startTimeFilter = timePlus55MinString; // Heure après 55 minutes
    const endTimeFilter = timePlus3HoursString; // Heure après 3 heures

    // Requête avec les restrictions de dates et heures combinées
    return await Consultation.find({
      where: {
        doctor: { id: doctorId },
        consultationDate: Between(startDateTime, endDateTime), // Comparer la date
        startTime: Between(startTimeFilter, endTimeFilter) // Comparer l'heure
      },
      order: { consultationDate: 'DESC', startTime: 'DESC' },
      relations: {
        doctor: { department: true },
        patient: true
      }
    });
  }
}
