import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from './config/routes.config';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';


const routes: Routes = [
  {path: RoutesConfig.routesNames.home, component: HomePageComponent},
  {path: RoutesConfig.routesNames.error404, component: Error404PageComponent},
  {path: '', loadChildren: './modules/user/user.module#UserModule'},
  {path: '', loadChildren: './modules/event/event.module#EventModule'},
  {path: '', loadChildren: './modules/guest/guest.module#GuestModule'},

  {path: '**', redirectTo: RoutesConfig.routesNames.error404},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
