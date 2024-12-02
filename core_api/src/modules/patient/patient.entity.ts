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
import { Gender } from '../gender/gender.entity';
import { Consultation } from '../consultation/consultation.entity';

@ObjectType()
@Entity()
export class Patient extends BaseEntity {
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
  @Column({ nullable: false, unique: true, type: 'varchar', length: 100 })
  ssn: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 100 })
  town: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 100 })
  postcode: string;

  @Field(() => Date)
  @Column({ nullable: false, type: 'date' })
  dateOfBirth: Date;

  @Field(() => Gender)
  @ManyToOne(() => Gender, (gender) => gender.users)
  gender: Gender;

  @Field(() => [Consultation])
  @OneToMany(() => Consultation, (consultation) => consultation.patient)
  consultations: Consultation[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
