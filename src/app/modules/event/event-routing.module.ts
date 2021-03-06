import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { AuthenticationGuardService } from '../core/helpers/authentication-guard.service';
import { EventPageCreateComponent } from './pages/event-page-create/event-page-create.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';
import { EventPageGuestsComponent } from './pages/event-page-guests/event-page-guests.component';
import { EventPageGuestsEditComponent } from './pages/event-page-guests-edit/event-page-guests-edit.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';


const eventRoutesNames = RoutesConfig.routesNames.event;

const routes: Routes = [
  {path: eventRoutesNames.create, component: EventPageCreateComponent, canActivate: [AuthenticationGuardService]},
  {path: eventRoutesNames.event, component: EventPageOverviewComponent, pathMatch: 'full'},
  {path: eventRoutesNames.eventGuests, component: EventPageGuestsComponent, pathMatch: 'full'},
  {path: eventRoutesNames.eventGuestsEdit, component: EventPageGuestsEditComponent, pathMatch: 'full'},
  {path: eventRoutesNames.events, component: EventPageListComponent, canActivate: [AuthenticationGuardService]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {
}
