import { Appointment } from "@/entities/Appointment";
import { AddAppointmentInput, FilterAppointment } from "@/models/appointments/Appointment";
import { SlotInput, Slot } from "@/models/appointments/Slot";
import { AppointmentService } from "@/services/AppointmentService";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class AppointmentResolver {
  constructor(
    private readonly appointmentService: AppointmentService,
  ) {}
  
  @Query(() => [Appointment])
  async getAppointments(
    @Arg("input") input: FilterAppointment,
  ): Promise<Appointment[]> {
    return this.appointmentService.getAppointments(input);
  }

  @Query(() => Appointment)
  async getAppointment(
    @Arg("input") input: FilterAppointment,
  ): Promise<Appointment> {
    return this.appointmentService.getAppointment(input);
  }

  @Mutation(() => Appointment)
  async addAppointment(
    @Arg("input") input: AddAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentService.addAppointment(input);
  }

  @Query(() => [Slot])
  async getSlots(
    @Arg('slotInput') slotInput: SlotInput,
  ): Promise<Slot[]> {
    return this.appointmentService.getSlots(slotInput.doctorId, slotInput.start, slotInput.end);
  }
}