import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { EventoPageCriacaoComponent } from './pages/evento-page-criacao/evento-page-criacao.component';


const routesNames = RoutesConfig.routesNames.evento;

const routes: Routes = [
  {path: routesNames.criacao, component: EventoPageCriacaoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
