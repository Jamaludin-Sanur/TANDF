import { Appointment } from "@/entities/Appointment";
import {
  FilterAppointment,
  AddAppointmentInput,
} from "@/models/appointments/Appointment";
import { FilterDoctor } from "@/models/doctor/Doctor";
import { Service, Inject } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Doctor } from "@/entities/Doctor";
import { DoctorService } from "./DoctorService";
import moment from "moment";
import { Slot, SlotAvailability } from "@/models/appointments/Slot";
import { FilterAvailability } from "@/models/doctor/Availability";

@Service()
export class AppointmentService {
  @Inject()
  private readonly doctorService: DoctorService;

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>
  ) {}

  async getAppointments(input: FilterAppointment): Promise<Appointment[]> {
    // Define search filter
    const filter: any = {
      where: {},
      relations: ["doctor"],
    };
    if (input.id) filter.where.id = input.id;
    if (input.date) filter.where.date = input.date;
    if (input.startTime) filter.where.startTime = input.startTime;
    if (input.endTime) filter.where.endTime = input.endTime;
    if (input.doctorId) filter.where.doctor = { id: input.doctorId };
    if (input.searchMax) filter.take = input.searchMax;

    // Search
    const result = await this.appointmentRepo.find(filter);
    return result || [];
  }

  async getAppointment(input: FilterAppointment): Promise<Appointment> {
    // Find 1
    input.searchMax = 1;

    // Search
    const result: Appointment[] = await this.getAppointments(input);
    return result.length > 0 ? result[0] : null;
  }

  async addAppointment(input: AddAppointmentInput): Promise<Appointment> {
    // Validate input
    const date = moment.utc(input.date);
    const startTime = moment.utc(input.startTime, "HH:mm:ss");
    const endTime = moment.utc(input.endTime, "HH:mm:ss");

    if (!date.isValid()) throw new Error(`Invalid date ${input.date}`);
    if (!startTime.isValid())
      throw new Error(`Invalid startTime ${input.startTime}`);
    if (!endTime.isValid()) throw new Error(`Invalid endTime ${input.endTime}`);

    // Find Doctor
    const filterDoctor: FilterDoctor = new FilterDoctor();
    filterDoctor.id = input.doctorId;
    const doctor: Doctor = await this.doctorService.getDoctor(filterDoctor);
   
    if (!doctor) throw new Error(`Doctor id ${input.doctorId} not found`);

    // Find Doctor availability
    const filterAvailability = new FilterAvailability();
    filterAvailability.doctorId = input.doctorId;
    filterAvailability.startTime = startTime.format("HH:mm:ss");
    filterAvailability.endTime = endTime.format("HH:mm:ss");
    filterAvailability.dayOfWeek = moment(input.date).isoWeekday();
    const availabilities = await this.doctorService.getDoctorAvailability(
      filterAvailability
    );
    if (availabilities.length <= 0) throw new Error(`Invalid availability`);

    // Find Doctor Appointment
    const filter = new FilterAppointment();
    filter.date = input.date;
    filter.startTime = input.startTime;
    filter.endTime = input.endTime;
    filter.doctorId = input.doctorId;
    const appointments = await this.getAppointments(filter);
    if (appointments.length)
      throw new Error(
        `There is existing appoinment at ${input.date} | ${input.startTime}:${input.endTime}`
      );

    // Add appointment
    const appt: Appointment = new Appointment();
    appt.doctor = doctor;
    appt.patientName = input.patientName;
    appt.startTime = startTime.format("HH:mm:ss");
    appt.endTime = endTime.format("HH:mm:ss");
    appt.date = date.format('YYYY-MM-DD');
    appt.description = input.description;
    const result = await this.appointmentRepo.save(appt);
    return result;
  }

  async getSlots(doctorId: number, from: Date, to: Date): Promise<Slot[]> {

    const startDate = moment.utc(from);
    const endDate = moment.utc(to);
    const result: Slot[] = [];

    // Get Doctor availability
    const filterAvailability = new FilterAvailability();
    filterAvailability.doctorId = doctorId;
    const availabilities = await this.doctorService.getDoctorAvailability(
      filterAvailability
    );

    // Iterate each day between startDate to endDate
    while (startDate.isSameOrBefore(endDate)) {
      const day = startDate.clone();

      // Filter doctor availability based on dayOfWeek
      const dayAvailability = availabilities.filter((ava) => {
        return ava.dayOfWeek === day.isoWeekday();
      });

      // Generate slot
      const slot = new Slot();
      slot.doctorId = doctorId;
      slot.date = day.format("YYYY-MM-DD");
      slot.availabilities = await Promise.all(
        dayAvailability.map(async (ava) => {

          // Get existing doctor appointment
          const appointments = await this.appointmentRepo.find({
            where: {
              doctor: {
                id: doctorId,
              },
              date: day.format("YYYY-MM-DD"),
              startTime: ava.startTimeUtc.toString(),
              endTime: ava.endTimeUtc.toString(),
            },
          });

          // Define doctor Availablity
          const slotAvailability = new SlotAvailability();
          slotAvailability.start = ava.startTimeUtc.toString();
          slotAvailability.end = ava.endTimeUtc.toString();
          if (appointments.length > 0) {
            slotAvailability.isAvailable = false;
          } else {
            slotAvailability.isAvailable = true;
          }

          return slotAvailability;
        })
      );
      result.push(slot);

      // Increment startDate for iteration purpose
      startDate.add(1, "days");
    }

    return result;
  }
}
