import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [CabecalhoComponent],
  exports: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
