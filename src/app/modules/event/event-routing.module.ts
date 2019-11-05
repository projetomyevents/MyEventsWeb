import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { EventPageRegisterComponent } from './pages/event-page-register/event-page-register.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';


const eventRoutes = RoutesConfig.routes.event;

const routes: Routes = [
  {path: eventRoutes.register, component: EventPageRegisterComponent},
  // TODO: implementar criação de url por id do evento
  {path: 'event/1i23h1231h23912h3', component: EventPageOverviewComponent},
  {path: eventRoutes.list, component: EventPageListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
