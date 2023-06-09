import { DraftPickInterface } from 'interfaces/draft-pick';
import { PlayerStatInterface } from 'interfaces/player-stat';
import { SportsTeamInterface } from 'interfaces/sports-team';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  age: number;
  sports_team_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  draft_pick?: DraftPickInterface[];
  player_stat?: PlayerStatInterface[];
  sports_team?: SportsTeamInterface;
  _count?: {
    draft_pick?: number;
    player_stat?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  sports_team_id?: string;
}
