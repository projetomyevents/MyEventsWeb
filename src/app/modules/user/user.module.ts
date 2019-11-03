import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';
import { UserPageSignupComponent } from './pages/user-page-signup/user-page-signup.component';
import { UserPageSigninComponent } from './pages/user-page-signin/user-page-signin.component';
import { UserPageConfirmationComponent } from './pages/user-page-confirmation/user-page-confirmation.component';
import { UserPageResendConfirmationComponent } from './pages/user-page-resend-confirmation/user-page-resend-confirmation.component';
import { UserPagePasswordResetComponent } from './pages/user-page-password-reset/user-page-password-reset.component';
import { UserPageSendPasswordResetComponent } from './pages/user-page-send-password-reset/user-page-send-password-reset.component';
import { CPFInput } from './components/cpf-input/cpf-input.component';
import { PhoneInput } from './components/phone-input/phone-input.component';


@NgModule({
  declarations: [
    UserPageSignupComponent,
    UserPageSigninComponent,
    UserPageConfirmationComponent,
    UserPageResendConfirmationComponent,
    UserPagePasswordResetComponent,
    UserPageSendPasswordResetComponent,
    CPFInput,
    PhoneInput
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
