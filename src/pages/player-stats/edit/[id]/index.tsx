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
import { getPlayerStatById, updatePlayerStatById } from 'apiSdk/player-stats';
import { Error } from 'components/error';
import { playerStatValidationSchema } from 'validationSchema/player-stats';
import { PlayerStatInterface } from 'interfaces/player-stat';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { getPlayers } from 'apiSdk/players';

function PlayerStatEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerStatInterface>(
    () => (id ? `/player-stats/${id}` : null),
    () => getPlayerStatById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlayerStatInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlayerStatById(id, values);
      mutate(updated);
      resetForm();
      router.push('/player-stats');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlayerStatInterface>({
    initialValues: data,
    validationSchema: playerStatValidationSchema,
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
            Edit Player Stat
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
            <FormControl id="points" mb="4" isInvalid={!!formik.errors?.points}>
              <FormLabel>Points</FormLabel>
              <NumberInput
                name="points"
                value={formik.values?.points}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('points', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.points && <FormErrorMessage>{formik.errors?.points}</FormErrorMessage>}
            </FormControl>
            <FormControl id="rebounds" mb="4" isInvalid={!!formik.errors?.rebounds}>
              <FormLabel>Rebounds</FormLabel>
              <NumberInput
                name="rebounds"
                value={formik.values?.rebounds}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('rebounds', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.rebounds && <FormErrorMessage>{formik.errors?.rebounds}</FormErrorMessage>}
            </FormControl>
            <FormControl id="assists" mb="4" isInvalid={!!formik.errors?.assists}>
              <FormLabel>Assists</FormLabel>
              <NumberInput
                name="assists"
                value={formik.values?.assists}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('assists', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.assists && <FormErrorMessage>{formik.errors?.assists}</FormErrorMessage>}
            </FormControl>
            <FormControl id="steals" mb="4" isInvalid={!!formik.errors?.steals}>
              <FormLabel>Steals</FormLabel>
              <NumberInput
                name="steals"
                value={formik.values?.steals}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('steals', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.steals && <FormErrorMessage>{formik.errors?.steals}</FormErrorMessage>}
            </FormControl>
            <FormControl id="blocks" mb="4" isInvalid={!!formik.errors?.blocks}>
              <FormLabel>Blocks</FormLabel>
              <NumberInput
                name="blocks"
                value={formik.values?.blocks}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('blocks', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.blocks && <FormErrorMessage>{formik.errors?.blocks}</FormErrorMessage>}
            </FormControl>
            <FormControl id="turnovers" mb="4" isInvalid={!!formik.errors?.turnovers}>
              <FormLabel>Turnovers</FormLabel>
              <NumberInput
                name="turnovers"
                value={formik.values?.turnovers}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('turnovers', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.turnovers && <FormErrorMessage>{formik.errors?.turnovers}</FormErrorMessage>}
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
  entity: 'player_stat',
  operation: AccessOperationEnum.UPDATE,
})(PlayerStatEditPage);
