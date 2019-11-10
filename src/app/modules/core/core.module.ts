import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { EmailInput } from './components/email-input/email-input.component';
import { CPFInput } from './components/cpf-input/cpf-input.component';
import { PhoneInput } from './components/phone-input/phone-input.component';
import { PasswordStrengthBar } from './components/password-strength-bar/password-strength-bar.component';
import { CEPInput } from './components/cep-input/cep-input.component';


@NgModule({
  declarations: [EmailInput, CPFInput, PhoneInput, PasswordStrengthBar, CEPInput],
  exports: [
    EmailInput,
    CPFInput,
    PhoneInput,
    PasswordStrengthBar,
    CEPInput
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressBarModule
  ]
})
export class CoreModule {
}
