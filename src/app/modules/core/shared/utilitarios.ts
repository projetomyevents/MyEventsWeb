export function calcularPorcentagem(valor: number, min: number, max: number): number {
  return (valor - min) / (max - min) * 100;
}
