import { Field, InputType } from "type-graphql";

@InputType()
export class FilterDoctor {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  searchMax?: number;
}

@InputType()
export class AddDoctorInput {
  @Field()
  name: string;
}