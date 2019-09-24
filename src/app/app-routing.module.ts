import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './config/routes.config';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';


const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  {path: '', component: PaginaInicialComponent},
  {path: routesNames.erro404, component: Pagina404Component},

  {path: '**', redirectTo: routesNames.erro404}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
