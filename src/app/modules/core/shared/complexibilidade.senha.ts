import { calcularPorcentagem } from './utilitarios';

const classes = {
  0: 'muito-fraca',
  1: 'fraca',
  2: 'mediocre',
  3: 'forte',
  4: 'epica'
};

/**
 * Calcula a complexibilidade da senha e retorna um valor entre 0 e 4 representando sua complexibilidade.
 *
 * @param senha - A senha a ser avaliada.
 */
export function complexibilidadeSenha(senha: string): { porcentagem: number; class: string } {
  // TODO: Algoritmo para calcular a complexibilidade da senha.
  const complexibilidade = Math.floor(Math.random() * 5);  // temporario
  const porcentagem = calcularPorcentagem(complexibilidade, 0, 4);
  return {porcentagem: porcentagem === 0
      ? 12  // retornar uma porcentagem entre 0 e 25 para a barra não sumir
      : porcentagem, class: classes[complexibilidade]};
}
