import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddAppointmentInput = {
  date: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  doctorId: Scalars['Float'];
  endTime: Scalars['String'];
  patientName: Scalars['String'];
  startTime: Scalars['String'];
};

export type AddDoctorInput = {
  name: Scalars['String'];
};

export type AddItemInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Appointment = {
  __typename?: 'Appointment';
  date: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  doctor: Doctor;
  endTime: Scalars['String'];
  id: Scalars['Float'];
  patientName: Scalars['String'];
  startTime: Scalars['String'];
};

export type Availability = {
  __typename?: 'Availability';
  dayOfWeek: Scalars['Float'];
  doctor: Doctor;
  endTimeUtc: Scalars['DateTime'];
  id: Scalars['Float'];
  startTimeUtc: Scalars['DateTime'];
};

export type Doctor = {
  __typename?: 'Doctor';
  appointments: Array<Appointment>;
  availabilities: Array<Availability>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type FilterAppointment = {
  date?: InputMaybe<Scalars['DateTime']>;
  doctorId?: InputMaybe<Scalars['Float']>;
  endTime?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  searchMax?: InputMaybe<Scalars['Float']>;
  startTime?: InputMaybe<Scalars['String']>;
};

export type FilterDoctor = {
  id?: InputMaybe<Scalars['Float']>;
  searchMax?: InputMaybe<Scalars['Float']>;
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAppointment: Appointment;
  addDoctor: Doctor;
  addItem: Item;
};


export type MutationAddAppointmentArgs = {
  input: AddAppointmentInput;
};


export type MutationAddDoctorArgs = {
  doctor: AddDoctorInput;
};


export type MutationAddItemArgs = {
  item: AddItemInput;
};

export type Query = {
  __typename?: 'Query';
  doctors: Array<Doctor>;
  getAppointment: Appointment;
  getAppointments: Array<Appointment>;
  getSlots: Array<Slot>;
  items: Array<Item>;
};


export type QueryDoctorsArgs = {
  filter: FilterDoctor;
};


export type QueryGetAppointmentArgs = {
  input: FilterAppointment;
};


export type QueryGetAppointmentsArgs = {
  input: FilterAppointment;
};


export type QueryGetSlotsArgs = {
  slotInput: SlotInput;
};

export type Slot = {
  __typename?: 'Slot';
  availabilities: Array<SlotAvailability>;
  date: Scalars['String'];
  doctorId: Scalars['Float'];
};

export type SlotAvailability = {
  __typename?: 'SlotAvailability';
  end: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  start: Scalars['String'];
};

export type SlotInput = {
  doctorId: Scalars['Float'];
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type AddItemMutationVariables = Exact<{
  item: AddItemInput;
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: { __typename?: 'Item', id: number, name: string, description?: string | null } };

export type GetSlotsQueryVariables = Exact<{
  slotInput: SlotInput;
}>;


export type GetSlotsQuery = { __typename?: 'Query', getSlots: Array<{ __typename?: 'Slot', doctorId: number, date: string, availabilities: Array<{ __typename?: 'SlotAvailability', start: string, end: string, isAvailable: boolean }> }> };

export type GetAppointmentsQueryVariables = Exact<{
  input: FilterAppointment;
}>;


export type GetAppointmentsQuery = { __typename?: 'Query', getAppointments: Array<{ __typename?: 'Appointment', id: number, date: string, startTime: string, endTime: string, patientName: string, description?: string | null, doctor: { __typename?: 'Doctor', id: number, name: string } }> };

export type AddAppointmentMutationVariables = Exact<{
  input: AddAppointmentInput;
}>;


export type AddAppointmentMutation = { __typename?: 'Mutation', addAppointment: { __typename?: 'Appointment', patientName: string, startTime: string, doctor: { __typename?: 'Doctor', id: number } } };

export type DoctorsQueryVariables = Exact<{
  filter: FilterDoctor;
}>;


export type DoctorsQuery = { __typename?: 'Query', doctors: Array<{ __typename?: 'Doctor', id: number, name: string }> };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, description?: string | null }> };


export const AddItemDocument = gql`
    mutation addItem($item: AddItemInput!) {
  addItem(item: $item) {
    id
    name
    description
  }
}
    `;
export type AddItemMutationFn = Apollo.MutationFunction<AddItemMutation, AddItemMutationVariables>;

/**
 * __useAddItemMutation__
 *
 * To run a mutation, you first call `useAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemMutation, { data, loading, error }] = useAddItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useAddItemMutation(baseOptions?: Apollo.MutationHookOptions<AddItemMutation, AddItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument, options);
      }
export type AddItemMutationHookResult = ReturnType<typeof useAddItemMutation>;
export type AddItemMutationResult = Apollo.MutationResult<AddItemMutation>;
export type AddItemMutationOptions = Apollo.BaseMutationOptions<AddItemMutation, AddItemMutationVariables>;
export const GetSlotsDocument = gql`
    query getSlots($slotInput: slotInput!) {
  getSlots(slotInput: $slotInput) {
    doctorId
    date
    availabilities {
      start
      end
      isAvailable
    }
  }
}
    `;

/**
 * __useGetSlotsQuery__
 *
 * To run a query within a React component, call `useGetSlotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSlotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSlotsQuery({
 *   variables: {
 *      slotInput: // value for 'slotInput'
 *   },
 * });
 */
export function useGetSlotsQuery(baseOptions: Apollo.QueryHookOptions<GetSlotsQuery, GetSlotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSlotsQuery, GetSlotsQueryVariables>(GetSlotsDocument, options);
      }
export function useGetSlotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSlotsQuery, GetSlotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSlotsQuery, GetSlotsQueryVariables>(GetSlotsDocument, options);
        }
export type GetSlotsQueryHookResult = ReturnType<typeof useGetSlotsQuery>;
export type GetSlotsLazyQueryHookResult = ReturnType<typeof useGetSlotsLazyQuery>;
export type GetSlotsQueryResult = Apollo.QueryResult<GetSlotsQuery, GetSlotsQueryVariables>;
export const GetAppointmentsDocument = gql`
    query getAppointments($input: FilterAppointment!) {
  getAppointments(input: $input) {
    id
    date
    startTime
    endTime
    patientName
    description
    doctor {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAppointmentsQuery__
 *
 * To run a query within a React component, call `useGetAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAppointmentsQuery(baseOptions: Apollo.QueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
      }
export function useGetAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
        }
export type GetAppointmentsQueryHookResult = ReturnType<typeof useGetAppointmentsQuery>;
export type GetAppointmentsLazyQueryHookResult = ReturnType<typeof useGetAppointmentsLazyQuery>;
export type GetAppointmentsQueryResult = Apollo.QueryResult<GetAppointmentsQuery, GetAppointmentsQueryVariables>;
export const AddAppointmentDocument = gql`
    mutation addAppointment($input: AddAppointmentInput!) {
  addAppointment(input: $input) {
    patientName
    startTime
    doctor {
      id
    }
  }
}
    `;
export type AddAppointmentMutationFn = Apollo.MutationFunction<AddAppointmentMutation, AddAppointmentMutationVariables>;

/**
 * __useAddAppointmentMutation__
 *
 * To run a mutation, you first call `useAddAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAppointmentMutation, { data, loading, error }] = useAddAppointmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<AddAppointmentMutation, AddAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAppointmentMutation, AddAppointmentMutationVariables>(AddAppointmentDocument, options);
      }
export type AddAppointmentMutationHookResult = ReturnType<typeof useAddAppointmentMutation>;
export type AddAppointmentMutationResult = Apollo.MutationResult<AddAppointmentMutation>;
export type AddAppointmentMutationOptions = Apollo.BaseMutationOptions<AddAppointmentMutation, AddAppointmentMutationVariables>;
export const DoctorsDocument = gql`
    query doctors($filter: FilterDoctor!) {
  doctors(filter: $filter) {
    id
    name
  }
}
    `;

/**
 * __useDoctorsQuery__
 *
 * To run a query within a React component, call `useDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoctorsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDoctorsQuery(baseOptions: Apollo.QueryHookOptions<DoctorsQuery, DoctorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DoctorsQuery, DoctorsQueryVariables>(DoctorsDocument, options);
      }
export function useDoctorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DoctorsQuery, DoctorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DoctorsQuery, DoctorsQueryVariables>(DoctorsDocument, options);
        }
export type DoctorsQueryHookResult = ReturnType<typeof useDoctorsQuery>;
export type DoctorsLazyQueryHookResult = ReturnType<typeof useDoctorsLazyQuery>;
export type DoctorsQueryResult = Apollo.QueryResult<DoctorsQuery, DoctorsQueryVariables>;
export const ItemsDocument = gql`
    query items {
  items {
    id
    name
    description
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;