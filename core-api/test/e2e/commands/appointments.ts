import { AddAppointmentInput } from '@/models/appointments/Appointment';
import supertest from 'supertest';

import { Api } from '../api';

export const bookAppointment = (api: Api, input: AddAppointmentInput): supertest.Test =>
api.post('').send({
  query: `
  mutation addAppointment($input: AddAppointmentInput!){
    addAppointment(
      input: $input
    ) {
      patientName
      startTime
      endTime
      date
      doctor {
        id
      }
    }
  }
`,
  variables: {
    input,
  },
});
