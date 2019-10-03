import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { UsuarioPageCadastroComponent } from './pages/usuario-page-cadastro/usuario-page-cadastro.component';
import { UsuarioPageLoginComponent } from './pages/usuario-page-login/usuario-page-login.component';
import { UsuarioPageSolicitacaoSenhaComponent } from './pages/usuario-page-solicitacao-senha/usuario-page-solicitacao-senha.component';
import { UsuarioPageAlteracaoSenhaComponent } from './pages/usuario-page-alteracao-senha/usuario-page-alteracao-senha.component';


const routesNames = RoutesConfig.routesNames.usuario;

const routes: Routes = [
  {path: routesNames.cadastro, component: UsuarioPageCadastroComponent},
  {path: routesNames.login, component: UsuarioPageLoginComponent},
  {path: routesNames.senha, component: UsuarioPageSolicitacaoSenhaComponent},
  // TODO: implementar o sistema de token para esta rota
  {path: 'alteracaodesenha', component: UsuarioPageAlteracaoSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
