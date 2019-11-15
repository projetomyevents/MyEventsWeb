import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { GuestRoutingModule } from './guest-routing.module';


@NgModule({
  declarations: [],
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
