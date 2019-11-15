import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
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


const userRoutesNames = RoutesConfig.routesNames.user;

const routes: Routes = [
  {path: userRoutesNames.signup, component: UserPageSignupComponent},
  {path: userRoutesNames.signin, component: UserPageSigninComponent},
  {path: userRoutesNames.activate, component: UserPageActivationComponent},
  {path: userRoutesNames.resendActivation, component: UserPageResendActivationComponent},
  {path: userRoutesNames.passwordReset, component: UserPagePasswordResetComponent},
  {path: userRoutesNames.sendPasswordReset, component: UserPageSendPasswordResetComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
