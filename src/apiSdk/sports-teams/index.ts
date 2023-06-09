import axios from 'axios';
import queryString from 'query-string';
import { SportsTeamInterface, SportsTeamGetQueryInterface } from 'interfaces/sports-team';
import { GetQueryInterface } from '../../interfaces';

export const getSportsTeams = async (query?: SportsTeamGetQueryInterface) => {
  const response = await axios.get(`/api/sports-teams${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSportsTeam = async (sportsTeam: SportsTeamInterface) => {
  const response = await axios.post('/api/sports-teams', sportsTeam);
  return response.data;
};

export const updateSportsTeamById = async (id: string, sportsTeam: SportsTeamInterface) => {
  const response = await axios.put(`/api/sports-teams/${id}`, sportsTeam);
  return response.data;
};

export const getSportsTeamById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sports-teams/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSportsTeamById = async (id: string) => {
  const response = await axios.delete(`/api/sports-teams/${id}`);
  return response.data;
};
