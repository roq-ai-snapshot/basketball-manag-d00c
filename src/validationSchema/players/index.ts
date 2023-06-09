import * as yup from 'yup';
import { draftPickValidationSchema } from 'validationSchema/draft-picks';
import { playerStatValidationSchema } from 'validationSchema/player-stats';

export const playerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  height: yup.number().integer().required(),
  weight: yup.number().integer().required(),
  age: yup.number().integer().required(),
  sports_team_id: yup.string().nullable().required(),
  draft_pick: yup.array().of(draftPickValidationSchema),
  player_stat: yup.array().of(playerStatValidationSchema),
});
