import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Disponibiliza validações personalizadas.
 */
export class CustomValidators {

  /**
   * Testa se todos os controles contidos no grupo de controles tem valores iguais.
   *
   * @param group - O grupo de controles.
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
   * @param control - O controle.
   */
  static cpf(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // remover qualquer caractére que não seja um dígito
    const rawCpf = control.value.toString().replace(/\D/g, '');

    // não aceitar CPFs inválidos
    if (rawCpf.length !== 11 || RegExp(`[${rawCpf[0]}]{11}`).test(rawCpf)) {
      return {cpf: true};
    }

    // transformar o cpf em uma lista tamanho 11 de números e dividir em digitos e identificador
    const cpf = [...rawCpf].map(value => Number(value));
    const digits = cpf.slice(0, 9);
    const cv = cpf.slice(-2);

    // daqui pra baixo eu n faço ideia doq ta aconteceno só adaptei de um código de outra pessoa
    // TODO: comentar oq ta acontecendo
    let sum: number;

    // validar o primeiro dígito
    sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(digits[i]) * (10 - i);
    }

    if ((sum % 11 < 2 ? 0 : 11 - (sum % 11)) !== Number(cv[0])) {
      return {cpf: true};
    }

    digits.push(cv[0]);

    // validar o segundo dígito
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(digits[i]) * (11 - i);
    }

    if ((sum % 11 < 2 ? 0 : 11 - (sum % 11)) !== Number(cv[1])) {
      return {cpf: true};
    }

    return null;
  }

  /**
   * Testa se o valor do controle é um número de celular ou telefone brasileiro válido.
   *
   * @param control - O controle.
   */
  static phone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // remover qualquer caractére que não seja um dígito
    const rawPhone = control.value.toString().replace(/\D/g, '');

    // não aceitar números de celular ou telefone brasileiro inválidos
    if (rawPhone.length < 10 || rawPhone.length > 11 || !RegExp(/^[1-9][0-9]9?[2-9][0-9]{7}$/).test(rawPhone)) {
      return {phone: true};
    }

    return null;
  }

  /**
   * Testa se o valor do controle é um CEP válido.
   *
   * @param control - O controle.
   */
  static cep(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // remover qualquer caractére que não seja um dígito
    const rawCep = control.value.toString().replace(/\D/g, '');

    // não aceitar CEPs inválidos
    if (rawCep.length !== 8) {
      return {cep: true};
    }

    return null;
  }

}
