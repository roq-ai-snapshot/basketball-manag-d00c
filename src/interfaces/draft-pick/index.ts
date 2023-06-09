import { PlayerInterface } from 'interfaces/player';
import { SportsTeamInterface } from 'interfaces/sports-team';
import { GetQueryInterface } from 'interfaces';

export interface DraftPickInterface {
  id?: string;
  round: number;
  pick_number: number;
  player_id: string;
  sports_team_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  player?: PlayerInterface;
  sports_team?: SportsTeamInterface;
  _count?: {};
}

export interface DraftPickGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  sports_team_id?: string;
}
