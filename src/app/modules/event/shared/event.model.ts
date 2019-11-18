import { SimpleUser } from '../../user/shared/user.model';
import { EventFile } from './event-file.model';

export interface Event {
  id: number;
  name: string;
  startDate: any;
  description: string;
  schedule: string;
  admissionPrice?: string;
  minimumAge?: number;
  attire?: string;
  cep: string;
  stateName: string;
  cityName: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
  image?: EventFile;
  attachments?: EventFile[];
  user: SimpleUser;
}

export interface SimpleEvent {
  id: string;
  name: string;
  startDate: any;
  description: string;
  image?: EventFile;
}

export interface NewEvent {
  name: string;
  startDate: Date;
  companionLimit: number;
  description: string;
  schedule: string;
  admissionPrice?: string;
  minimumAge?: number;
  attire?: string;
  cep: string;
  cityId: number;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
  image?: EventFile;
  attachments?: EventFile[];
}
