import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { Consultation } from '../entities.index';

@ObjectType()
@Entity()
export class ConsultationSubject extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 60 })
  label: string;

  @Field(() => [Consultation])
  @OneToMany(() => Consultation, (consultation) => consultation.subject)
  consultations: Consultation[];
}
