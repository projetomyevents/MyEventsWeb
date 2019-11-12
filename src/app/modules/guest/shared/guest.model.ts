import { PresenceStatus } from './presence-status.enum';

export interface Guest {
  id: number;
  name: string;
  email: string;
  presenceStatus?: PresenceStatus;
  companionLimit: number;
  confirmedCompanions?: number;
}

export interface SimpleGuest {
  name: string;
  presenceStatus: PresenceStatus;
  confirmedCompanions: number;
}
