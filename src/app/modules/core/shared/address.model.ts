export interface Address {
  cep: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
  cityId: string;
}

export interface City {
  id: number;
  name: string;
  stateId: number;
}

export interface State {
  id: number;
  name: string;
}
