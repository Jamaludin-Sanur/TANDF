import { FC } from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

import { Doctor } from '@/generated/core.graphql';

const DoctorSelector: FC<{
  doctors: Doctor[];
  value?: Doctor;
  onChange: (doc: Doctor | undefined) => void;
}> = ({ doctors, value, onChange }) => {
  return (
    <Box>
      {!doctors || doctors.length === 0 ? (
        <Text>No doctors</Text>
      ) : (
        doctors.map((doc) => (
          <Text
            key={doc.id}
            onClick={() => onChange(doc)}
            color={value?.id === doc.id ? 'teal.500' : 'black.500'}
            fontWeight={value?.id === doc.id ? 900 : 'initial'}
          >
            {doc.name}
          </Text>
        ))
      )}
    </Box>
  );
};

export default DoctorSelector;
