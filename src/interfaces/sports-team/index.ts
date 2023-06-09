import { DraftPickInterface } from 'interfaces/draft-pick';
import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SportsTeamInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  user_id: string;
  tenant_id: string;
  draft_pick?: DraftPickInterface[];
  player?: PlayerInterface[];
  user?: UserInterface;
  _count?: {
    draft_pick?: number;
    player?: number;
  };
}

export interface SportsTeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
  tenant_id?: string;
}
