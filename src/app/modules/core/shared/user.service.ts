import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { User } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = AppConfig.serverUrl;

  constructor(private http: HttpClient) { }

  /**
   * Autentica um usuário.
   *
   * @param email - O email do usuário.
   * @param password - A senha do usuário.
   */
  signin(email: string, password: string): Promise<any> {
    return this.http.post(`${this.url}/login`, {email, password}, {observe: 'response'}).toPromise();
  }

  /**
   * Cadastra um usuário.
   *
   * @param user - O usuário.
   */
  signup(user: User): Promise<boolean> {
    // TODO: retornar os possíveis erros
    return this.http.post(`${this.url}/usuario`, user).toPromise().then(
      () => true,
      () => false
    );
  }

}
