import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Unique, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";

@ObjectType()
@Entity()
@Unique(["doctor", "date", "startTime"])
export class Appointment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Doctor)
  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  doctor: Doctor;

  @Field()
  @Column()
  patientName: string;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  startTime: string;

  @Field()
  @Column()
  endTime: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;
}