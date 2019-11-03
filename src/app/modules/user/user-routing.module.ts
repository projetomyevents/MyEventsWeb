import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { UserPageSignupComponent } from './pages/user-page-signup/user-page-signup.component';
import { UserPageSigninComponent } from './pages/user-page-signin/user-page-signin.component';
import { UserPageSendPasswordResetComponent } from './pages/user-page-send-password-reset/user-page-send-password-reset.component';
import { UserPagePasswordResetComponent } from './pages/user-page-password-reset/user-page-password-reset.component';
import { UserPageResendConfirmationComponent } from './pages/user-page-resend-confirmation/user-page-resend-confirmation.component';
import { UserPageConfirmationComponent } from './pages/user-page-confirmation/user-page-confirmation.component';


const userRoutes = RoutesConfig.routes.user;

const routes: Routes = [
  {path: userRoutes.signup, component: UserPageSignupComponent},
  {path: userRoutes.signin, component: UserPageSigninComponent},
  {path: userRoutes.confirm, component: UserPageConfirmationComponent},
  {path: userRoutes.resendConfirmation, component: UserPageResendConfirmationComponent},
  {path: userRoutes.passwordReset, component: UserPagePasswordResetComponent},
  {path: userRoutes.sendPasswordReset, component: UserPageSendPasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
