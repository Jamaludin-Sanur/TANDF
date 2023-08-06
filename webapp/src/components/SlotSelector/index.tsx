import { FC, useCallback, useMemo, useState } from 'react';

import { CheckIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, Text, Box, Button, Progress } from '@chakra-ui/react';
import { isSameDay, format, isEqual } from 'date-fns';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';

import { Slot, SlotAvailability } from '@/generated/core.graphql';

import { Container } from './styled';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

type Props = {
  minimumStartDate: Date;
  maximumStartDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  availableSlots: SlotAvailability[];
  value?: SlotAvailability;
  onChange: (slot: SlotAvailability) => void;
  styleProps?: FlexProps;
  slotLoading?: Slot;
  loadingSlots: boolean;
  onSubmit: () => void;
};

const SlotSelector: FC<Props> = ({
  minimumStartDate,
  maximumStartDate,
  availableSlots,
  loadingSlots,
  value,
  onChange,
  onSubmit,
  selectedDate,
  onSelectDate,
  styleProps,
  ...props
}) => {

  const minStartDate = moment(minimumStartDate);
  const maxStartDate = moment(maximumStartDate);

  return (
    <Container {...styleProps} margin='initial'>
      <DayPickerSingleDateController
        initialVisibleMonth={() => moment(selectedDate)}
        onFocusChange={() => null}
        date={moment(selectedDate)}
        focused
        hideKeyboardShortcutsPanel
        isDayBlocked={(d) => {
          const isBlocked =
            d.startOf('day') < minStartDate.startOf('day') ||
            d.endOf('day') > maxStartDate.endOf('day');
          return isBlocked;
        }}
        onDateChange={(d) => {
          if (d) onSelectDate(d.toDate());
        }}
        {...props}
      />
      <Flex flexDirection='column' px='12px' w='100%'>
        <Text fontSize='17px' mb='20px' mt='22px' textAlign='left'>
          {format(selectedDate, 'eeee, MMMM dd')}
        </Text>
        <Box flexGrow={1} overflow='auto' position='relative'>
          {loadingSlots ? (
            <Progress />
          ) : (
            availableSlots.map((slot) => {
              return (
                <Button
                  disabled={!slot.isAvailable}
                  key={slot.start}
                  _hover={{
                    backgroundColor: 'white.10',
                  }}
                  borderColor='white.10'
                  colorScheme='gray'
                  fontSize='16px'
                  mb='8px'
                  onClick={() => onChange(slot)}
                  py='16px'
                  variant='outline'
                  width='100%'
                  backgroundColor={slot.isAvailable ? 'teal.500' : 'gray.500'}
                >
                  {`${slot.start} - ${slot.end}`}
                  {value?.start === slot.start && (
                    <CheckIcon position='absolute' right='18px' />
                  )}
                </Button>
              );
            })
          )}
        </Box>
        {value && (
          <Button
            colorScheme='orange'
            fontSize='16px'
            py='16px'
            mb='16px'
            width='100%'
            onClick={onSubmit}
          >
            Book Appointment
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default SlotSelector;
