import { Resolver, Query, Authorized } from 'type-graphql';
import { ConsultationSubject } from './consultationSubject.entity';
import { RoleCode } from '../entities.index';

@Resolver(ConsultationSubject)
export default class ConsultationSubjectResolver {
  @Authorized([RoleCode.SECRETARY])
  @Query(() => [ConsultationSubject])
  async consultationSubjects() {
    return await ConsultationSubject.find();
  }
}
