import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { AppConfig } from '../../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  autenticarUsuario(email, senha): Promise<boolean> {
    return this.usuarioService.login(email, senha).then(
      (response) => {
        sessionStorage.setItem('username', email);
        AppConfig.token = response.headers.get('authorization');
        return true;
      },
      () => false);
  }

  usuarioLogado(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  desconectarUsuario() {
    sessionStorage.removeItem('username');
  }

}
