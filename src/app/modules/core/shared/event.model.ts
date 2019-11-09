import { SimpleUser } from './user.model';

export interface Event {
  id: number;
  name: string;
  startDate: Date;
  companionLimit: number;
  description: string;
  schedule: string;
  admissionPrice?: string;
  minAge?: number;
  attire?: string;
  cep: string;
  stateName: string;
  cityName: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
  image?: string;
  attachments?: string[];
  user: SimpleUser;
}

export interface SimpleEvent {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface NewEvent {
  name: string;
  startDate: Date;
  companionLimit: number;
  description: string;
  schedule: string;
  admissionPrice?: string;
  minAge?: number;
  attire?: string;
  cep: string;
  cityId: number;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
  image?: string;
  attachments?: string[];
}
