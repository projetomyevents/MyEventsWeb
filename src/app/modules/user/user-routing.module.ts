import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { UserPageSignupComponent } from './pages/user-page-signup/user-page-signup.component';
import { UserPageSigninComponent } from './pages/user-page-signin/user-page-signin.component';
import { UserPageSendPasswordResetComponent } from './pages/user-page-send-password-reset/user-page-send-password-reset.component';
import { UserPagePasswordResetComponent } from './pages/user-page-password-reset/user-page-password-reset.component';
import { UserPageResendActivationComponent } from './pages/user-page-resend-activation/user-page-resend-activation.component';
import { UserPageActivationComponent } from './pages/user-page-activation/user-page-activation.component';


const userRoutes = RoutesConfig.routes.user;

const routes: Routes = [
  {path: userRoutes.signup, component: UserPageSignupComponent},
  {path: userRoutes.signin, component: UserPageSigninComponent},
  {path: userRoutes.activate, component: UserPageActivationComponent},
  {path: userRoutes.resendActivation, component: UserPageResendActivationComponent},
  {path: userRoutes.passwordReset, component: UserPagePasswordResetComponent},
  {path: userRoutes.sendPasswordReset, component: UserPageSendPasswordResetComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
