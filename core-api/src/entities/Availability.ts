import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";

@ObjectType()
@Entity()
export class Availability extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dayOfWeek: number;

  @Field()
  @Column('time')
  startTimeUtc: Date;

  @Field()
  @Column('time')
  endTimeUtc: Date;

  @Field(() => Doctor)
  @ManyToOne(() => Doctor, doctor => doctor.availabilities)
  doctor: Doctor;
}