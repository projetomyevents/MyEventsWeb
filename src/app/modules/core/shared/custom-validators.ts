import { FormGroup, ValidationErrors } from '@angular/forms';

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

}
