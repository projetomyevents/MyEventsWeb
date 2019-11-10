import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class SharedModule {
}
