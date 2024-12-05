import { Consultation } from '../entities.index';
import { Resolver, Query, Arg } from 'type-graphql';

@Resolver(Consultation)
export default class ConsultationResolver {
  // TODO : rescrtict access to role === doctor
  @Query(() => [Consultation])
  async dossier(@Arg('patientId') patientId: number) {
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
}
