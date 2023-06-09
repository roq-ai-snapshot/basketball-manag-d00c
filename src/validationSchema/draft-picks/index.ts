import * as yup from 'yup';

export const draftPickValidationSchema = yup.object().shape({
  round: yup.number().integer().required(),
  pick_number: yup.number().integer().required(),
  player_id: yup.string().nullable().required(),
  sports_team_id: yup.string().nullable().required(),
});
