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
  Role,
  Department,
  Gender,
  WorkingHours,
  Attachment,
  Consultation
} from '../entities.index';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 50 })
  firstname: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 50 })
  lastname: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 100 })
  email: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 100 })
  password: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'bool', default: false })
  isArchived: boolean;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @Field(() => Gender)
  @ManyToOne(() => Gender, (gender) => gender.users)
  gender: Gender;

  @Field(() => [WorkingHours])
  @OneToMany(() => WorkingHours, (workingHours) => workingHours.doctor)
  workingHours: WorkingHours[];

  @Field(() => [Attachment])
  @OneToMany(() => Attachment, (attachment) => attachment.author)
  attachmentsCreated: Attachment[];

  @Field(() => [Consultation])
  @OneToMany(() => Consultation, (consultation) => consultation.author)
  consultationsCreated: Consultation[];

  @Field(() => [Consultation])
  @OneToMany(() => Consultation, (consultation) => consultation.author)
  doctorConsultations: Consultation[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
