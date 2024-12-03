import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import {
  ConsultationSubject,
  User,
  Patient,
  Attachment
} from '../entities.index';

@ObjectType()
@Entity()
export class Consultation extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 255 })
  description: string;

  @Field(() => Date)
  @Column({ nullable: false, type: 'date' })
  consultationDate: Date;

  @Field(() => String)
  @Column({ nullable: false, type: 'time' })
  startTime: string;

  @Field(() => Int)
  @Column({ nullable: false, type: 'int' })
  durationMinutes: number;

  @ManyToOne(() => ConsultationSubject, (subject) => subject.consultations)
  subject: ConsultationSubject;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.attachmentsCreated)
  author: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.doctorConsultations)
  doctor: User;

  @Field(() => Patient)
  @ManyToOne(() => Patient, (patient) => patient.consultations)
  patient: Patient;

  @Field(() => [Attachment])
  @OneToMany(() => Attachment, (attachment) => attachment.consultation)
  attachments: Attachment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
