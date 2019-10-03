import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioPageCadastroComponent } from './pages/usuario-page-cadastro/usuario-page-cadastro.component';
import { UsuarioPageLoginComponent } from './pages/usuario-page-login/usuario-page-login.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioPageSolicitacaoSenhaComponent } from './pages/usuario-page-solicitacao-senha/usuario-page-solicitacao-senha.component';
import { UsuarioPageAlteracaoSenhaComponent } from './pages/usuario-page-alteracao-senha/usuario-page-alteracao-senha.component';



@NgModule({
  declarations: [
    UsuarioPageCadastroComponent,
    UsuarioPageLoginComponent,
    UsuarioPageSolicitacaoSenhaComponent,
    UsuarioPageAlteracaoSenhaComponent
  ],
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
