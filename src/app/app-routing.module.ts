import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from './config/routes.config';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';
import { AuthenticationGuardService } from './modules/core/helpers/authentication-guard.service';


const routes: Routes = [
  {path: RoutesConfig.routes.home, component: HomePageComponent},
  {path: RoutesConfig.routes.error404, component: Error404PageComponent},
  {path: '', loadChildren: './modules/user/user.module#UserModule'},
  {path: '', loadChildren: './modules/event/event.module#EventModule', canActivate: [AuthenticationGuardService]},

  {path: '**', redirectTo: RoutesConfig.routes.error404}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
