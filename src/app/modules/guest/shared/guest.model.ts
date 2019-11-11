export interface Guest {
  id: number;
  name: string;
  email: string;
  companionLimit: number;
  confirmedCompanions: number;
  presenceStatus: number;
  eventId: number;
}

export interface SimpleGuest {
  name: string;
  presenceStatus: number;
  confirmedCompanions: number;
}
