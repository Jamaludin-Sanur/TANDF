import { useEffect, useState } from 'react';

import { Heading, Box,  } from '@chakra-ui/react';
import { addDays } from 'date-fns';

import ListAppointment from '@/components/Appointment/ListAppointment';
import DoctorSelector from '@/components/DoctorSelector';
import SlotSelector from '@/components/SlotSelector';
import {
  Doctor,
  SlotAvailability,
  useGetAppointmentsQuery,
  useGetSlotsQuery,
  useDoctorsQuery,
  useAddAppointmentMutation,
} from '@/generated/core.graphql';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [isLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotAvailability>();
  const minimumStartDate = new Date();
  const maximumStartDate = minimumStartDate && addDays(minimumStartDate, 30);

  const getAppointmentsQuery = useGetAppointmentsQuery({
    variables: {
      input: {},
    },
  });
  const { data, loading } = useDoctorsQuery({
    variables: {
      filter: {},
    },
  });
  const slotsQuery = useGetSlotsQuery({
    variables: {
      slotInput: {
        doctorId: selectedDoctor?.id!,
        start: selectedDate,
        end: selectedDate,
      },
    },
  });

  const [addAppointment, { loading: loadingAddAppointment }] =
    useAddAppointmentMutation();

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      slotsQuery.refetch({
        slotInput: {
          doctorId: selectedDoctor?.id!,
          start: selectedDate!,
          end: selectedDate!,
        },
      });
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      slotsQuery.refetch({
        slotInput: {
          doctorId: selectedDoctor?.id!,
          start: selectedDate!,
          end: selectedDate!,
        },
      });
    }
  }, [selectedDate]);

  const handleBooking = async () => {
    await addAppointment({
      variables: {
        input: {
          patientName: '',
          doctorId: selectedDoctor?.id!,
          date: selectedDate,
          startTime: selectedSlot?.start!,
          endTime: selectedSlot?.end!,
          description: '',
        },
      },
    });
    slotsQuery.refetch();
    getAppointmentsQuery.refetch();
  };

  return (
    <Box>
      <Heading>List Appointments</Heading>
      <ListAppointment
        appointments={getAppointmentsQuery.data?.getAppointments || []}
      />
      <br />

      <Heading>Add Appointments</Heading>
      <Box display='flex' flexDirection={'row'}>
        <Box flex={1}>
          <Heading fontSize={18}>Select Doctor</Heading>
          <DoctorSelector
            doctors={data?.doctors as Doctor[]}
            value={selectedDoctor}
            onChange={(doctor)=>setSelectedDoctor(doctor)}
          />
        </Box>

        <Box flex={1}>
          <Heading fontSize={18}>Select Time</Heading>
          {selectedDoctor ? (
            <SlotSelector
              minimumStartDate={minimumStartDate}
              maximumStartDate={maximumStartDate}
              selectedDate={selectedDate}
              onSelectDate={(date)=>setSelectedDate(date)}
              availableSlots={
                slotsQuery.data?.getSlots[0]?.availabilities || []
              }
              value={selectedSlot}
              onChange={(slot) => setSelectedSlot(slot)}
              loadingSlots={isLoading}
              onSubmit={handleBooking}
            />
          ) : (
            '(Please select Doctor)'
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Appointments;
