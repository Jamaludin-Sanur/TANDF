import { Field, InputType } from "type-graphql";
import 'reflect-metadata';

@InputType()
export class FilterAppointment {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  doctorId?: number;

  @Field({ nullable: true })
  searchMax?: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  endTime?: string;
}

@InputType()
export class AddAppointmentInput {

  @Field()
  patientName: string;

  @Field()
  doctorId: number;

  @Field()
  date: Date;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field({ nullable: true })
  description?: string;
}