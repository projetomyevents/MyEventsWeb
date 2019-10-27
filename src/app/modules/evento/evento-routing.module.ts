import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { EventoPageCriacaoComponent } from './pages/evento-page-criacao/evento-page-criacao.component';
import { EventoPageListaComponent } from './pages/evento-page-lista/evento-page-lista.component';
import { EventoPageVisaoGeralComponent } from './pages/evento-page-visao-geral/evento-page-visao-geral.component';


const routesNames = RoutesConfig.routesNames.evento;

const routes: Routes = [
  {path: routesNames.criacao, component: EventoPageCriacaoComponent},
  {path: routesNames.lista, component: EventoPageListaComponent},

  // TODO: implementar criação de url por id do evento


  {path: routesNames.visao, component: EventoPageVisaoGeralComponent}
  // para realizar os testes eu comentei essa parte
  // {path: 'evento/1i23h1231h23912h3', component: EventoPageVisaoGeralComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule { }
