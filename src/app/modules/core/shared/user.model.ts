/* Representa um usuário. */
export interface User {
  /* A identificação do usuário. */
  id?: number;
  /* O nome completo do usuário. */
  name: string;
  /* A senha do usuário. */
  password: string;
  /* O email do usuário. */
  email: string;
  /* O CPF do usuário. */
  cpf: string;
  /* O número de celular ou telefone do usuário. */
  phoneNumber: string;
}
