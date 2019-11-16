import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import { EventRoutingModule } from './event-routing.module';
import { EventPageCreateComponent } from './pages/event-page-create/event-page-create.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';
import { EventPageGuestsComponent } from './pages/event-page-guests/event-page-guests.component';
import { EventPageGuestsEditComponent } from './pages/event-page-guests-edit/event-page-guests-edit.component';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';


@NgModule({
  declarations: [
    EventPageCreateComponent,
    EventPageOverviewComponent,
    EventPageGuestsComponent,
    EventPageGuestsEditComponent,
    EventPageListComponent,
  ],
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
    MatTableModule,
    MatBadgeModule,
  ],
})
export class EventModule {
}
