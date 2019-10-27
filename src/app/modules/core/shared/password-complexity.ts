const classes = {
  0: 'too-weak',
  1: 'weak',
  2: 'mediocre',
  3: 'strong',
  4: 'epic'
};

/**
 * Calcula a complexibilidade da senha e retorna um valor entre 0 e 4 representando sua complexibilidade.
 *
 * @param password - A senha a ser avaliada.
 */
export function passwordComplexity(password: string): number {
// TODO: Implementar algoritmo para calcular a complexibilidade da senha.
  return Math.floor(Math.random() * 5);  // temporario
}

/**
 * Retorna um objeto contendo a porcentagem de complexibilidade alcançada
 * e a o nome da classe a ser usada na barra de força da senha.
 *
 * @param password - A senha a ser avaliada.
 */
export function passwordStrength(password: string): { percentage: number; class: string } {
  const complexity = passwordComplexity(password);  // temporario
  return {
    // retorna 12 caso a complexibilidade for 0 para a barra de força não sumir
    percentage: complexity === 0 ? 12 : complexity / 4 * 100,
    class: classes[complexity]
  };
}
