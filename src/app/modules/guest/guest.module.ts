import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestRoutingModule } from './guest-routing.module';
import { CoreModule } from '../core/core.module';
import { GuestPageListComponent } from './pages/guest-page-list/guest-page-list.component';
import { GuestPageListEditComponent } from './pages/guest-page-list-edit/guest-page-list-edit.component';


@NgModule({
  declarations: [GuestPageListComponent, GuestPageListEditComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class GuestModule { }
