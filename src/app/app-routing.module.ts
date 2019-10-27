import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './config/routes.config';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';


const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: routesNames.error404, component: Error404PageComponent},
  {path: '', loadChildren: './modules/user/user.module#UserModule'},
  {path: '', loadChildren: './modules/event/event.module#EventModule'},

  {path: '**', redirectTo: routesNames.error404}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
