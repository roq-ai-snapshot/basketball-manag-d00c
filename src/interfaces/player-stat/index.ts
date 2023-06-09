import { PlayerInterface } from 'interfaces/player';
import { GetQueryInterface } from 'interfaces';

export interface PlayerStatInterface {
  id?: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  player_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  player?: PlayerInterface;
  _count?: {};
}

export interface PlayerStatGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
}
