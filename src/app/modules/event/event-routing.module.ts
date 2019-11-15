import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { AuthenticationGuardService } from '../core/helpers/authentication-guard.service';
import { EventPageCreateComponent } from './pages/event-page-create/event-page-create.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';


const eventRoutes = RoutesConfig.routes.event;

const routes: Routes = [
  {path: eventRoutes.create, component: EventPageCreateComponent, canActivate: [AuthenticationGuardService]},
  {path: eventRoutes.event, component: EventPageOverviewComponent, pathMatch: 'full'},
  {path: eventRoutes.events, component: EventPageListComponent, canActivate: [AuthenticationGuardService]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {
}
