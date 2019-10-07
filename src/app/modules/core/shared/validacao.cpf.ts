/**
 * Realiza a validação de um cpf.
 * Adaptado de: https://www.geradorcpf.com/javascript-validar-cpf.htm.
 *
 * @param cpf - O cpf a ser validado.
 */
export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') { return false; }

  // Eliminar CPFs inválidos
  if (cpf.length !== 11
      || cpf === '00000000000'
      || cpf === '11111111111'
      || cpf === '22222222222'
      || cpf === '33333333333'
      || cpf === '44444444444'
      || cpf === '55555555555'
      || cpf === '66666666666'
      || cpf === '77777777777'
      || cpf === '88888888888'
      || cpf === '99999999999') { return false; }

  let add: number;

  // Validar o primeiro dígito
  add = 0;
  for (let i = 0; i < 9; i++) {
    add += Number(cpf.charAt(i)) * (10 - i);

    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) { rev = 0; }
    if (rev !== Number(cpf.charAt(9))) { return false; }
  }

  // Validar o segundo dígito
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += Number(cpf.charAt(i)) * (11 - i);

    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) { rev = 0; }
    if (rev !== Number(cpf.charAt(10))) { return false; }
  }

  return true;
}