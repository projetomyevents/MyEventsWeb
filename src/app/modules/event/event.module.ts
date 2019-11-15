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
import { CoreModule } from '../core/core.module';
import { EventRoutingModule } from './event-routing.module';
import { EventPageCreateComponent } from './pages/event-page-create/event-page-create.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';


@NgModule({
  declarations: [EventPageCreateComponent, EventPageListComponent, EventPageOverviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventRoutingModule,
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
    MatTooltipModule,
  ],
})
export class EventModule {
}
