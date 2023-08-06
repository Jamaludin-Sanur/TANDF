import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class SlotAvailability {
  @Field()
  start: String;

  @Field()
  end: String;

  @Field()
  isAvailable: Boolean;
}

@ObjectType()
export class Slot {
  @Field()
  doctorId: Number;
  
  @Field()
  date: String;
  
  @Field(() => [SlotAvailability])
  availabilities: SlotAvailability[];
}



@InputType('slotInput')
@ObjectType()
export class SlotInput {
  @Field()
  doctorId: number;

  @Field()
  start: Date;

  @Field()
  end: Date;
}

@InputType('slotOutput')
@ObjectType()
export class SlotOutput {

  @Field(() => [Slot])
  slots: Slot;

}
