import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { User, Consultation } from '../entities.index';

@ObjectType()
@Entity()
export class Attachment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, type: 'text' })
  note: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 150 })
  filePath: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 100 })
  fileDisplayName: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.attachmentsCreated)
  author: User;

  @Field(() => Consultation)
  @ManyToOne(() => Consultation, (consultation) => consultation.attachments)
  consultation: Consultation;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
