export interface Guest {
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

export interface GuestEdit {
  name: string;
  email: string;
  companionLimit: number;
}

export interface GuestUpdate {
  presenceStatus: any;
  confirmedCompanions: number;
}
