import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  autenticar(username, password): boolean {
    if (username === 'javainuse' && password === 'password') {
      sessionStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }

  usuarioLogado(): boolean {
    return !(sessionStorage.getItem('username') === null);
  }

  desconectar() {
    sessionStorage.removeItem('username');
  }
}
