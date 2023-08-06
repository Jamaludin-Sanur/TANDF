import { FC, useCallback, useMemo, useState } from 'react';

import { CheckIcon } from '@chakra-ui/icons';
import {
  Container,
  FlexProps,
  Text,
  Box,
  Button,
  Progress,
} from '@chakra-ui/react';
import { isSameDay, format, isEqual } from 'date-fns';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';

import { Appointment } from '@/generated/core.graphql';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

type Props = {
  appointments: any[];
};

const SlotSelector: FC<Props> = ({ appointments }) => {
  return (
    <Box flexGrow={1}>
      {appointments.map((appt) => {
        return (
          <Box key={appt.id} marginBottom={'0.5rem'}>
            <Text fontWeight={700}>{appt.doctor?.name || ''}</Text>
            <Text>{appt.date}</Text>
            <Text>{`${appt.startTime} - ${appt.endTime}`}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default SlotSelector;
