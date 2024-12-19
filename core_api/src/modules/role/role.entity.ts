import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ObjectType, Int, registerEnumType } from 'type-graphql';
import { User } from '../entities.index';

export enum RoleCode {
  AGENT = 'agent',
  SECRETARY = 'secretary',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}

registerEnumType(RoleCode, {
  name: 'RoleCode',
  description: 'The roles available to a user'
});
@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => RoleCode)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 30 })
  code: RoleCode;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 30 })
  label: string;

  @Field(() => [User], { nullable: false })
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
