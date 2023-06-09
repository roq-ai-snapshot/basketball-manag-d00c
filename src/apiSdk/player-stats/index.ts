import axios from 'axios';
import queryString from 'query-string';
import { PlayerStatInterface, PlayerStatGetQueryInterface } from 'interfaces/player-stat';
import { GetQueryInterface } from '../../interfaces';

export const getPlayerStats = async (query?: PlayerStatGetQueryInterface) => {
  const response = await axios.get(`/api/player-stats${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPlayerStat = async (playerStat: PlayerStatInterface) => {
  const response = await axios.post('/api/player-stats', playerStat);
  return response.data;
};

export const updatePlayerStatById = async (id: string, playerStat: PlayerStatInterface) => {
  const response = await axios.put(`/api/player-stats/${id}`, playerStat);
  return response.data;
};

export const getPlayerStatById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/player-stats/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePlayerStatById = async (id: string) => {
  const response = await axios.delete(`/api/player-stats/${id}`);
  return response.data;
};
