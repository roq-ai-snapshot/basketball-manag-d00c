import * as yup from 'yup';
import { draftPickValidationSchema } from 'validationSchema/draft-picks';
import { playerValidationSchema } from 'validationSchema/players';

export const sportsTeamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  tenant_id: yup.string().required(),
  user_id: yup.string().nullable().required(),
  draft_pick: yup.array().of(draftPickValidationSchema),
  player: yup.array().of(playerValidationSchema),
});
