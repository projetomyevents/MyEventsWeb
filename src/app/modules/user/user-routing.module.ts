import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { UserPageSignupComponent } from './pages/user-page-signup/user-page-signup.component';
import { UserPageSigninComponent } from './pages/user-page-signin/user-page-signin.component';
import { UserPageRequestPasswordResetComponent } from './pages/user-page-request-password-reset/user-page-request-password-reset.component';
import { UserPagePasswordResetComponent } from './pages/user-page-password-reset/user-page-password-reset.component';


const routesNames = RoutesConfig.routesNames.user;

const routes: Routes = [
  {path: routesNames.signup, component: UserPageSignupComponent},
  {path: routesNames.signin, component: UserPageSigninComponent},
  {path: routesNames.passwordReset, component: UserPageRequestPasswordResetComponent},
  // TODO: implementar o sistema de token para esta rota
  {path: 'password-reset', component: UserPagePasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
