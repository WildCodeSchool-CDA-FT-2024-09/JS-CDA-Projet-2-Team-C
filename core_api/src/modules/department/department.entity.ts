import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User } from '../entities.index';

@ObjectType()
@Entity()
export class Department extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 50 })
  label: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
