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

import { Role } from '../role/role.entity';
import { Department } from '../department/department.entity';
import { Gender } from '../gender/gender.entity';
import { WorkingHours } from '../working_hours/workingHours.entity';

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
  @Column({ nullable: false, type: 'varchar', length: 100 })
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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
