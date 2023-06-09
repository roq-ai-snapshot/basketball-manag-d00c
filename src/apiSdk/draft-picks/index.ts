import axios from 'axios';
import queryString from 'query-string';
import { DraftPickInterface, DraftPickGetQueryInterface } from 'interfaces/draft-pick';
import { GetQueryInterface } from '../../interfaces';

export const getDraftPicks = async (query?: DraftPickGetQueryInterface) => {
  const response = await axios.get(`/api/draft-picks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDraftPick = async (draftPick: DraftPickInterface) => {
  const response = await axios.post('/api/draft-picks', draftPick);
  return response.data;
};

export const updateDraftPickById = async (id: string, draftPick: DraftPickInterface) => {
  const response = await axios.put(`/api/draft-picks/${id}`, draftPick);
  return response.data;
};

export const getDraftPickById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/draft-picks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDraftPickById = async (id: string) => {
  const response = await axios.delete(`/api/draft-picks/${id}`);
  return response.data;
};
