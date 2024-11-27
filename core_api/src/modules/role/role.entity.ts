import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: 'varchar', width: 30 })
  label: string;
}
