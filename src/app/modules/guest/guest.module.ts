import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestPageListComponent } from './pages/guest-page-list/guest-page-list.component';
import { GuestPageListEditComponent } from './pages/guest-page-list-edit/guest-page-list-edit.component';


@NgModule({
  declarations: [GuestPageListComponent, GuestPageListEditComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class GuestModule {
}
