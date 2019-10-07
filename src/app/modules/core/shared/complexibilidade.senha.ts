import { calcularPorcentagem } from './utilitarios';

const classes = {
  0: 'muito-fraca',
  1: 'fraca',
  2: 'mediocre',
  3: 'forte',
  4: 'epica'
};

// TODO: Algoritmo para calcular a complexibilidade da senha.
export function complexibilidadeSenha(senha: string): { porcentagem: number; class: string } {
  const complexibilidade = Math.floor(Math.random() * 5);
  const porcentagem = calcularPorcentagem(complexibilidade, 0, 4);
  return {porcentagem: porcentagem === 0
      ? 12  // retornar uma porcentagem entre 0 e 25 para a barra não sumir
      : porcentagem, class: classes[complexibilidade]};
}
