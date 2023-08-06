import { Doctor } from "@/entities/Doctor";
import { AddDoctorInput, FilterDoctor } from "@/models/doctor/Doctor";
import { DoctorService } from "@/services/DoctorService";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}
  
  @Query(() => [Doctor])
   doctors(
    @Arg('filter') filter: FilterDoctor,
   ): Promise<Doctor[]> {
    return this.doctorService.getDoctors(filter);

  }

  @Mutation(() => Doctor)
  async addDoctor(
    @Arg('doctor') doctor: AddDoctorInput,
  ): Promise<Doctor> {

    // Prepare Doctor data
    const newDoctor = new Doctor();
    newDoctor.name = doctor.name;

    // Create Doctor data
    return this.doctorService.addDoctor(newDoctor);
  }

}