import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { EventPageRegisterComponent } from './pages/event-page-register/event-page-register.component';
import { EventRoutingModule } from './event-routing.module';
import { EventPageListComponent } from './pages/event-page-list/event-page-list.component';
import { EventPageOverviewComponent } from './pages/event-page-overview/event-page-overview.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [EventPageRegisterComponent, EventPageListComponent, EventPageOverviewComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ]
})
export class EventModule { }
