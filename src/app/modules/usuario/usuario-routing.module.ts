import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from '../../config/routes.config';
import { UsuarioPageCadastroComponent } from './pages/usuario-page-cadastro/usuario-page-cadastro.component';
import { UsuarioPageLoginComponent } from './pages/usuario-page-login/usuario-page-login.component';
import { UsuarioPageSenhaComponent } from './pages/usuario-page-senha/usuario-page-senha.component';


const routesNames = RoutesConfig.routesNames.usuario;

const routes: Routes = [
  {path: routesNames.cadastro, component: UsuarioPageCadastroComponent},
  {path: routesNames.login, component: UsuarioPageLoginComponent},
  {path: routesNames.senha, component: UsuarioPageSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
