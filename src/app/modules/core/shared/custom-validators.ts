import { FormGroup } from '@angular/forms';

/**
 * Disponibiliza validações personalizadas.
 */
export class CustomValidators {

  /**
   * Testa se todos os controles continos no grupo de controles tem valores iguais.
   *
   * @param group - Grupo de controle.
   */
  static different(group: FormGroup): { different: true } | null {
    const controls = Object.keys(group.controls);
    const firstValue = group.get(controls.splice(0, 1)).value;
    return controls.every((control: string) => group.get(control).value === firstValue) ? null : {different: true};
  }

}
