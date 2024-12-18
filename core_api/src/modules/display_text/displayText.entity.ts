import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class DisplayText extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', length: 60 })
  label: string;

  @Field(() => String)
  @Column({ nullable: false, type: 'varchar', length: 140 })
  textFR: string;
}
