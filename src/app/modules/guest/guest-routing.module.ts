import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { GuestPageListComponent } from './pages/guest-page-list/guest-page-list.component';
import { GuestPageListOrganizerComponent } from './pages/guest-page-list-organizer/guest-page-list-organizer.component';
import { GuestGuardService } from './shared/guest-guard.service';


const guestRoutes = RoutesConfig.routes.guest;

const routes: Routes = [
  {path: guestRoutes.guests, component: GuestPageListComponent, pathMatch: 'full'},
  {path: guestRoutes.guestsOrganize, component: GuestPageListOrganizerComponent, pathMatch: 'full',
    canActivate: [GuestGuardService]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {
}
