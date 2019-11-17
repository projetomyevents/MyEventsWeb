import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { GuestPageStatusComponent } from './pages/guest-page-status/guest-page-status.component';


const guestRoutesNames = RoutesConfig.routesNames.guest;

const routes: Routes = [
  {path: guestRoutesNames.status, component: GuestPageStatusComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {
}
