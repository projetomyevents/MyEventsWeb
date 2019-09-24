import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './components/cabecalho/cabecalho.component';



@NgModule({
  declarations: [CabecalhoComponent],
  exports: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
