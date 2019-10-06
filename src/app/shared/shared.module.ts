import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';



@NgModule({
  declarations: [CabecalhoComponent],
  exports: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class SharedModule { }
