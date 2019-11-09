import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { EventPageRegisterComponent } from './pages/event-page-register/event-page-register.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';


const eventRoutes = RoutesConfig.routes.event;

const routes: Routes = [
  {path: eventRoutes.register, component: EventPageRegisterComponent},
  {path: eventRoutes.event, component: EventPageOverviewComponent},
  {path: eventRoutes.events, component: EventPageListComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
