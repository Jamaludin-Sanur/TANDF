import { faker } from '@faker-js/faker';

import { createApi } from '../api';

import { fetchSlots } from '../commands/doctors';
import { bookAppointment } from '../commands/appointments';
import { AddAppointmentInput } from '@/models/appointments/Appointment';
import { Appointment } from '@/entities/Appointment';
import { SlotInput } from '@/models/appointments/Slot';

const api = createApi();

describe('Book appointment scenario', () => {
  it('should book appointment successfully', async () => {
    // Prepare Data
    const data = new AddAppointmentInput();
    data.patientName = "Rina Patient";
    data.doctorId = 1;
    data.date = new Date('2023-08-07');;
    data.startTime = '01:45:00';
    data.endTime = '02:00:00';

    // Send Data
    const response = await bookAppointment(api, data);

    // Assert Data
    expect(response.body.data.addAppointment.patientName).toBe(data.patientName);
    expect(response.body.data.addAppointment.doctor.id).toBe(data.doctorId);
    expect(response.body.data.addAppointment.startTime).toBe(data.startTime);
    expect(response.body.data.addAppointment.endTime).toBe(data.endTime);

  });
});
