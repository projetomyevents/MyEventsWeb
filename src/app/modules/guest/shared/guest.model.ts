export interface Guest {
  id: number;
  name: string;
  email: string;
  presenceStatus?: any;
  companionLimit: number;
  confirmedCompanions?: number;
}

export interface SimpleGuest {
  name: string;
  presenceStatus: any;
  confirmedCompanions: number;
}
