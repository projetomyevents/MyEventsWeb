/* Representa um endereço. */
export interface Endereco {
  /* A identificação do endereço. */
  id?: number;
  cep: string;
  cidade: Cidade;
  bairro: string;
  rua: string;
  numero?: string;
  complemento?: string;
}

/* Representa uma cidade. */
export interface Cidade {
  /* A identificação da cidade. */
  id?: number;
  nome: string;
  estado: Estado;
}

/* Representa um estado. */
export interface Estado {
  /* A identificação do estado. */
  id?: number;
  abreviacao: string;
  nome: string;
}
