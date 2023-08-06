import { Field, InputType } from "type-graphql";

@InputType()
export class FilterAvailability {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  doctorId?: number;

  @Field({ nullable: true })
  dayOfWeek: number;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  endTime?: string;
}