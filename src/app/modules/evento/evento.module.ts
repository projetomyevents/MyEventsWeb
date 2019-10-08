import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoPageCriacaoComponent } from './pages/evento-page-criacao/evento-page-criacao.component';
import { EventoRoutingModule } from './evento-routing.module';


@NgModule({
  declarations: [EventoPageCriacaoComponent],
  imports: [
    CommonModule,
    EventoRoutingModule
  ]
})
export class EventoModule { }
