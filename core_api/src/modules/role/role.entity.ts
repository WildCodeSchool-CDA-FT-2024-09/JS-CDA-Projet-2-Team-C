import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Check
} from 'typeorm';
import { Field, ObjectType, Int, registerEnumType } from 'type-graphql';
import { User } from '../entities.index';

export enum RoleLabel {
  AGENT = 'agent',
  SECRETARY = 'secretary',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}

registerEnumType(RoleLabel, {
  name: 'RoleLabel',
  description: 'The roles available to a user'
});
@ObjectType()
@Check(`"label" IN ('agent', 'secretary', 'doctor', 'admin')`)
@Entity()
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => RoleLabel)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 30 })
  code: RoleLabel;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 30 })
  label: string;

  @Field(() => [User], { nullable: false })
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
