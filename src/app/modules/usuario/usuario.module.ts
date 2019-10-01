import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPageCadastroComponent } from './pages/usuario-page-cadastro/usuario-page-cadastro.component';
import { UsuarioPageLoginComponent } from './pages/usuario-page-login/usuario-page-login.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioPageSenhaComponent } from './pages/usuario-page-senha/usuario-page-senha.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UsuarioPageCadastroComponent, UsuarioPageLoginComponent, UsuarioPageSenhaComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }