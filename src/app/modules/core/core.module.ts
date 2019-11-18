import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmailInput } from './components/email-input/email-input.component';
import { CPFInput } from './components/cpf-input/cpf-input.component';
import { PhoneInput } from './components/phone-input/phone-input.component';
import { PasswordStrengthBar } from './components/password-strength-bar/password-strength-bar.component';
import { CEPInput } from './components/cep-input/cep-input.component';
import { FileInput } from './components/file-input/file-input.component';


@NgModule({
  declarations: [LoadingSpinnerComponent, EmailInput, CPFInput, PhoneInput, PasswordStrengthBar, CEPInput, FileInput],
  exports: [
    LoadingSpinnerComponent,
    EmailInput,
    CPFInput,
    PhoneInput,
    PasswordStrengthBar,
    CEPInput,
    FileInput,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CoreModule {
}
