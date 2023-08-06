import { Doctor } from "@/entities/Doctor";
import { Availability } from "@/entities/Availability";
import { FilterDoctor } from "@/models/doctor/Doctor";
import { FilterAvailability } from "@/models/doctor/Availability";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Availability)
    private readonly availabilityRepo: Repository<Availability>
  ) {}

  async getDoctors(input: FilterDoctor): Promise<Doctor[]> {
    // Define search filter
    const filter: any = {
      where: {},
    };
    if (input.id) filter.where.id = input.id;
    if (input.searchMax) filter.take = input.searchMax;

    // Search
    const result = await this.doctorRepo.find(filter);
    return result;
  }

  async getDoctor(input: FilterDoctor): Promise<Doctor> {
    // Find 1
    input.searchMax = 1;

    // Search
    const result: Doctor[] = await this.getDoctors(input);
    return result.length > 0 ? result[0] : null;
  }

  async addDoctor(doctor: Doctor): Promise<Doctor> {
    return this.doctorRepo.save(doctor);
  }

  async getDoctorAvailability(
    input: FilterAvailability
  ): Promise<Availability[]> {
    
    // Define search filter
    const filter: any = {
      where: {},
    };
    if (input.id) filter.where.id = input.id;
    if (input.doctorId) filter.where.doctor = { id: input.doctorId };
    if (input.dayOfWeek) filter.where.dayOfWeek = input.dayOfWeek;
    if (input.startTime) filter.where.startTimeUtc = input.startTime;
    if (input.endTime) filter.where.endTimeUtc = input.endTime;

    // search
    const result = await this.availabilityRepo.find(filter);
    return result;
  }

  async addDoctorAvailability(
    availability: Availability
  ): Promise<Availability> {
    return this.availabilityRepo.save(availability);
  }
}
