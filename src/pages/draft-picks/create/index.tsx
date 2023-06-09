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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createDraftPick } from 'apiSdk/draft-picks';
import { Error } from 'components/error';
import { draftPickValidationSchema } from 'validationSchema/draft-picks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { SportsTeamInterface } from 'interfaces/sports-team';
import { getPlayers } from 'apiSdk/players';
import { getSportsTeams } from 'apiSdk/sports-teams';
import { DraftPickInterface } from 'interfaces/draft-pick';

function DraftPickCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DraftPickInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDraftPick(values);
      resetForm();
      router.push('/draft-picks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DraftPickInterface>({
    initialValues: {
      round: 0,
      pick_number: 0,
      player_id: (router.query.player_id as string) ?? null,
      sports_team_id: (router.query.sports_team_id as string) ?? null,
    },
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
            Create Draft Pick
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'draft_pick',
  operation: AccessOperationEnum.CREATE,
})(DraftPickCreatePage);
