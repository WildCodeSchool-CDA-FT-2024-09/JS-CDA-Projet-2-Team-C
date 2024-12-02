import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User, Patient } from '../entities.index';

@ObjectType()
@Entity()
export class Gender extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 30 })
  label: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @Field(() => [Patient])
  @OneToMany(() => Patient, (patient) => patient.gender)
  patients: Patient[];
}
