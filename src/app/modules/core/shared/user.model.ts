export interface NewUser {
  email: string;
  password: string;
  confirmedPassword: string;
  name: string;
  cpf: string;
  phone: string;
}

export interface SimpleUser {
  email: string;
  name: string;
  phone: string;
  token?: string;
}

export interface NewPassword {
  password: string;
  confirmedPassword: string;
}
