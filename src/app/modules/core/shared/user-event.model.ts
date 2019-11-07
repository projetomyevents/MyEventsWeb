import { SimpleUser } from './user.model';

export interface UserEvent {
  id: number;
  name: string;
  startDate: Date;
  admissionPrice?: string;
  companionLimit: number;
  minAge?: number;
  attire?: string;
  description: string;
  schedule: string;
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

export interface NewUserEvent {
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
