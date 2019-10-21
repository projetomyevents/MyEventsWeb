import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';

/**
 * Disponibiliza validações personalizadas.
 */
export class CustomValidators {

  /**
   * Testa se todos os controles continos no grupo de controles tem valores iguais.
   *
   * @param group - Grupo de controles.
   */
  static different(group: FormGroup): ValidationErrors | null {
    const controls = Object.keys(group.controls);
    const value = group.get(controls.splice(0, 1)).value;
    return controls.every((control: string) => group.get(control).value === value)
      ? null
      : {different: true};
  }

  /**
   * Testa se o valor do controle é um cpf válido.
   *
   * @param control - Controle.
   */
  static cpf(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null; }

    // remover qualquer caractére que não seja um dígito
    const rawCpf = control.value.toString().replace(/\D/g, '');

    // não aceitar CPFs inválidos
    if (rawCpf.length !== 11 || RegExp(`[${rawCpf[0]}]{11}`).test(rawCpf)) { return {cpf: true}; }

    // transformar o cpf em uma lista tamanho 11 de números e dividir em digitos e identificador
    const cpf = [...rawCpf].map(value => Number(value));
    const digitos = cpf.slice(0, 9);
    const identificador = cpf.slice(-2);

    // daqui pra baixo eu n faço ideia doq ta aconteceno só adaptei de um código de outra pessoa
    // TODO: comentar oq ta acontecendo
    let sum: number;

    // validar o primeiro dígito
    sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(digitos[i]) * (10 - i);
    }

    if ((sum % 11 < 2 ? 0 : 11 - (sum % 11)) !== Number(identificador[0])) {
      return {cpf: true};
    }

    digitos.push(identificador[0]);

    // validar o segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(digitos[i]) * (11 - i);
    }

    if ((sum % 11 < 2 ? 0 : 11 - (sum % 11)) !== Number(identificador[1])) {
      return {cpf: true};
    }

    return null;
  }

}
