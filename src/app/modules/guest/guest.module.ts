import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CoreModule } from '../core/core.module';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestPageStatusComponent } from './pages/guest-page-status/guest-page-status.component';


@NgModule({
  declarations: [GuestPageStatusComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class GuestModule {
}
