import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class WorkingHours extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ nullable: false, type: 'int' })
  weekday: number;

  @Field(() => String)
  @Column({ nullable: false, type: 'time' })
  startTime: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'time' })
  endTime: string;

  // For the moment, we only need to get working hours starting from a user.
  // So, no field for accessing the user from their working hours.
  // But TypeORM does require the relation to be defined here for the other side
  // (OneToMany in User) to work.
  @ManyToOne(() => User, (user) => user.workingHours)
  doctor: User;
}
