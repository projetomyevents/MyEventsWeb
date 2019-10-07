/**
 * Calcula a porcentagem de um valor entre um intervalo de valores.
 *
 * @param valor - Valor da porcentagem.
 * @param min - Valor mínimo da porcentagem.
 * @param max - Valor máximo da porcentagem.
 */
export function calcularPorcentagem(valor: number, min: number, max: number): number {
  return (valor - min) / (max - min) * 100;
}
