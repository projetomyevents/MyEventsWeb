import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { EventRoutingModule } from './event-routing.module';
import { CoreModule } from '../core/core.module';
import { EventPageRegisterComponent } from './pages/event-page-register/event-page-register.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';


@NgModule({
  declarations: [EventPageRegisterComponent, EventPageOverviewComponent, EventPageListComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatTooltipModule
  ]
})
export class EventModule {
}
