import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestRoutingModule } from './guest-routing.module';
import { CoreModule } from '../core/core.module';
import { GuestPageListOrganizerComponent } from './pages/guest-page-list-organizer/guest-page-list-organizer.component';
import { GuestPageListComponent } from './pages/guest-page-list/guest-page-list.component';


@NgModule({
  declarations: [GuestPageListOrganizerComponent, GuestPageListComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class GuestModule { }
