import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  token: string;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  autenticar(email, senha): Promise<boolean> {
    return this.usuarioService.login(email, senha).then(
      (response) => {
        sessionStorage.setItem('username', email);
        this.token = response.headers.get('authorization');
        return true;
      },
      () => false);
  }

  usuarioLogado(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  desconectar() {
    sessionStorage.removeItem('username');
  }
}
