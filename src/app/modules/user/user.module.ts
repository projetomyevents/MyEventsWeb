import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user-routing.module';
import { UserPageSignupComponent } from './pages/user-page-signup/user-page-signup.component';
import { UserPageSigninComponent } from './pages/user-page-signin/user-page-signin.component';
import { UserPageActivationComponent } from './pages/user-page-activation/user-page-activation.component';
import {
  UserPageResendActivationComponent
} from './pages/user-page-resend-activation/user-page-resend-activation.component';
import { UserPagePasswordResetComponent } from './pages/user-page-password-reset/user-page-password-reset.component';
import {
  UserPageSendPasswordResetComponent
} from './pages/user-page-send-password-reset/user-page-send-password-reset.component';


@NgModule({
  declarations: [
    UserPageSignupComponent,
    UserPageSigninComponent,
    UserPageActivationComponent,
    UserPageResendActivationComponent,
    UserPagePasswordResetComponent,
    UserPageSendPasswordResetComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
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
  ],
})
export class UserModule {
}
