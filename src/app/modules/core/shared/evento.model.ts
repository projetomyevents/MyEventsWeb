import { Endereco } from './endereco.model';

/* Representa um evento. */
export interface Evento {
  /* A identificação do evento. */
  id?: number;
  /* O nome do evento. */
  nome: string;
  /* O data de inicio do evento. */
  data: Date;
  /* O endereço do local do evento. */
  local: Endereco;
  /* O preço de entrada do evento. */
  preco?: string;
  /* O limite de acompanhantes padrão de cada convidado. */
  limiteAcompanhantes: number;
  /* A idade mínima permitida no evento. */
  idadeMinima?: number;
  /* O traje recomendado para o evento. */
  traje?: string;
  /* A descrição do evento. */
  descricao?: string;
  /* A imagem ilustrativa do evento. */
  imagem?: File;
  /* O cronograma do evento. */
  cronograma: string;
  /* Os arquivos em anexo do evento. */
  anexos?: FileList
}
