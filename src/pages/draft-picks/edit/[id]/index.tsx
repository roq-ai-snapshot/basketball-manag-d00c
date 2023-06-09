import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getDraftPickById, updateDraftPickById } from 'apiSdk/draft-picks';
import { Error } from 'components/error';
import { draftPickValidationSchema } from 'validationSchema/draft-picks';
import { DraftPickInterface } from 'interfaces/draft-pick';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { SportsTeamInterface } from 'interfaces/sports-team';
import { getPlayers } from 'apiSdk/players';
import { getSportsTeams } from 'apiSdk/sports-teams';

function DraftPickEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<DraftPickInterface>(
    () => (id ? `/draft-picks/${id}` : null),
    () => getDraftPickById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DraftPickInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDraftPickById(id, values);
      mutate(updated);
      resetForm();
      router.push('/draft-picks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<DraftPickInterface>({
    initialValues: data,
    validationSchema: draftPickValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Draft Pick
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="round" mb="4" isInvalid={!!formik.errors?.round}>
              <FormLabel>Round</FormLabel>
              <NumberInput
                name="round"
                value={formik.values?.round}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('round', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.round && <FormErrorMessage>{formik.errors?.round}</FormErrorMessage>}
            </FormControl>
            <FormControl id="pick_number" mb="4" isInvalid={!!formik.errors?.pick_number}>
              <FormLabel>Pick Number</FormLabel>
              <NumberInput
                name="pick_number"
                value={formik.values?.pick_number}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('pick_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.pick_number && <FormErrorMessage>{formik.errors?.pick_number}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<PlayerInterface>
              formik={formik}
              name={'player_id'}
              label={'Select Player'}
              placeholder={'Select Player'}
              fetcher={getPlayers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.first_name as string}
                </option>
              )}
            />
            <AsyncSelect<SportsTeamInterface>
              formik={formik}
              name={'sports_team_id'}
              label={'Select Sports Team'}
              placeholder={'Select Sports Team'}
              fetcher={getSportsTeams}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name as string}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'draft_pick',
  operation: AccessOperationEnum.UPDATE,
})(DraftPickEditPage);
