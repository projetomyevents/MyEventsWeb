import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { GuestPageListComponent } from './pages/guest-page-list/guest-page-list.component';
import { GuestPageListEditComponent } from './pages/guest-page-list-edit/guest-page-list-edit.component';


const guestRoutes = RoutesConfig.routes.guest;

const routes: Routes = [
  {path: guestRoutes.guests, component: GuestPageListComponent, pathMatch: 'full'},
  {path: guestRoutes.guestsEdit, component: GuestPageListEditComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {
}
