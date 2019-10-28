export interface User {
  email: string;
  password: string;
  name: string;
  cpf: string;
  phone: string;
  token?: string;
}

export interface NewUser {
  email: string;
  password: string;
  confirmedPassword: string;
  name: string;
  cpf: string;
  phone: string;
}
