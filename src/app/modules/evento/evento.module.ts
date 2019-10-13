import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoPageCriacaoComponent } from './pages/evento-page-criacao/evento-page-criacao.component';
import { EventoRoutingModule } from './evento-routing.module';
import { EventoPageListaComponent } from './pages/evento-page-lista/evento-page-lista.component';
import { EventoPageVisaoGeralComponent } from './pages/evento-page-visao-geral/evento-page-visao-geral.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [EventoPageCriacaoComponent, EventoPageListaComponent, EventoPageVisaoGeralComponent],
  imports: [
    CommonModule,
    EventoRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class EventoModule { }
