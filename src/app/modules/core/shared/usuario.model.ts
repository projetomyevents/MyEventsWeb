/* Representa um usuário. */
export interface Usuario {
  /* A identificação do usuário. */
  id?: number;
  /* O nome completo do usuário. */
  nome: string;
  /* A senha do usuário. */
  senha: string;
  /* O email do usuário. */
  email: string;
  /* O CPF do usuário. */
  cpf: string;
  /* O número de celular do usuário. */
  celular: string;
}
