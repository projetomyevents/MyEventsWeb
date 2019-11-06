import { Address } from './address.model';

export interface UserEvent {
  id?: number;
  name: string;
  startDate: Date;
  admissionPrice?: string;
  companionLimit: number;
  minAge?: number;
  attire?: string;
  description: string;
  schedule: string;
  address: Address;
  image?: File;
  attachments?: FileList;
}
