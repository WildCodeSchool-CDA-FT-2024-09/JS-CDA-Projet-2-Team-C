import { Field, InputType } from 'type-graphql';
import { IsISO8601, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateConsultationInput {
  @Field()
  @IsUUID()
  doctorId: string;

  @Field()
  @IsString()
  subjectLabel: string;

  @Field()
  @IsUUID()
  patientId: string;

  @Field()
  @IsISO8601()
  start: string;

  @Field()
  @IsISO8601()
  end: string;

  @Field()
  @IsString()
  description: string;
}
