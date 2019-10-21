import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = AppConfig.serverUrl;

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Promise<any> {
    return this.http.post(`${this.url}/login`, {email, senha}, {observe: 'response'}).toPromise();
  }

  cadastrar(usuario: Usuario): Promise<boolean> {
    // TODO: retornar os possíveis erros
    return this.http.post(this.url, usuario).toPromise().then(
      () => true,
      () => false
    );
  }

}
