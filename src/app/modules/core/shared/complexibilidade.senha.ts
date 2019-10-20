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
export function complexibilidadeSenha(senha: string): number {
// TODO: Implementar algoritmo para calcular a complexibilidade da senha.
  return Math.floor(Math.random() * 5);  // temporario
}

/**
 * Retorna um objeto contendo a porcentagem de complexibilidade alcançada
 * e a o nome da classe a ser usada na barra de força da senha.
 *
 * @param senha - A senha a ser avaliada.
 */
export function forcaSenha(senha: string): { porcentagem: number; class: string } {
  const complexibilidade = complexibilidadeSenha(senha);  // temporario
  return {
    // retorna 12 caso a complexibilidade for 0 para a barra de força não sumir
    porcentagem: complexibilidade === 0 ? 12 : complexibilidade / 4 * 100,
    class: classes[complexibilidade]
  };
}
