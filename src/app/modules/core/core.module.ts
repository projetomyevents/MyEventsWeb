import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatProgressBarModule, MatTooltipModule } from '@angular/material';
import { CPFInput } from './components/cpf-input/cpf-input.component';
import { PhoneInput } from './components/phone-input/phone-input.component';
import { PasswordStrengthBar } from './components/password-strength-bar/password-strength-bar.component';
import { CEPInput } from './components/cep-input/cep-input.component';


@NgModule({
  declarations: [CPFInput, PhoneInput, PasswordStrengthBar, CEPInput],
  exports: [
    CPFInput,
    PhoneInput,
    PasswordStrengthBar,
    CEPInput
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class CoreModule { }
