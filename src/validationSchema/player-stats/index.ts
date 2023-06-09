import * as yup from 'yup';

export const playerStatValidationSchema = yup.object().shape({
  points: yup.number().integer().required(),
  rebounds: yup.number().integer().required(),
  assists: yup.number().integer().required(),
  steals: yup.number().integer().required(),
  blocks: yup.number().integer().required(),
  turnovers: yup.number().integer().required(),
  player_id: yup.string().nullable().required(),
});
