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

  @Column({ nullable: false, type: 'varchar', length: 255 })
  password: string;

  @Field(() => Boolean)
  @Column({ nullable: false, type: 'boolean', default: false })
  isArchived: boolean;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Field(() => Department, { nullable: true })
  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @Field(() => Gender, { nullable: true })
  @ManyToOne(() => Gender, (gender) => gender.users)
  gender: Gender;

  @Field(() => [WorkingHours], { nullable: true })
  @OneToMany(() => WorkingHours, (workingHours) => workingHours.doctor)
  workingHours: WorkingHours[];

  @Field(() => [Attachment], { nullable: true })
  @OneToMany(() => Attachment, (attachment) => attachment.author)
  attachmentsCreated: Attachment[];

  @Field(() => [Consultation], { nullable: true })
  @OneToMany(() => Consultation, (consultation) => consultation.author)
  consultationsCreated: Consultation[];

  @Field(() => [Consultation], { nullable: true })
  @OneToMany(() => Consultation, (consultation) => consultation.author)
  doctorConsultations: Consultation[];

  @Field(() => String, { nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;
}
