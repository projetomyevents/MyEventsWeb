/* Representa um usuário. */
export interface Usuario {
  /* A identificação de um usuário. */
  id?: number;
  /* O email de um usuário. */
  nome: string;
  /* O nome completo de um usuário. */
  senha: string;
  /* O CPF de um usuário. */
  email: string;
  /* O número de celular de um usuário. */
  cpf: string;
  /* A senha de um usuário. */
  celular: string;
}
