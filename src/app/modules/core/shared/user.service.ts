import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AppConfig } from '../../../config/app.config';
import { NewPassword, NewUser, SimpleUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = AppConfig.serverUrl;
  userEndpoint = EndpointsConfig.user;

  constructor(private http: HttpClient) { }

  /**
   * Autentica um usuário.
   *
   * @param email - O email do usuário.
   * @param password - A senha do usuário.
   */
  login(email: string, password: string): Promise<HttpResponse<SimpleUser>> {
    return this.http.post<SimpleUser>(`${this.url}/${this.userEndpoint.login}`, {email, password},
      {observe: 'response'}).toPromise();
  }

  /**
   * Registra um novo usuário.
   *
   * @param newUser - O novo usuário.
   */
  register(newUser: NewUser): Promise<any> {
    return this.http.post<any>(`${this.url}/${this.userEndpoint.register}`, newUser).toPromise();
  }

  /**
   * Ativa um usuário.
   *
   * @param token - O token de ativação do usuário.
   */
  activate(token: string): Promise<any> {
    return this.http.get<any>(`${this.url}/${this.userEndpoint.activate(token)}`).toPromise();
  }

  /**
   * Reenvia o token de ativação de um usuário para o seu email.
   *
   * @param email - O email do usuário.
   */
  resendActivation(email: string): Promise<any> {
    return this.http.get<any>(`${this.url}/${this.userEndpoint.resendActivation(email)}`).toPromise();
  }

  /**
   * Redefine a senha do usuário.
   *
   * @param token - O token de redefinição de senha do usuário.
   * @param newPassword - A nova senha do usuário.
   */
  resetPassword(token: string, newPassword: NewPassword): Promise<any> {
    return this.http.post<any>(`${this.url}/${this.userEndpoint.passwordReset(token)}`, newPassword).toPromise();
  }

  /**
   * Envia um token de redefinição de senha para o usuário.
   *
   * @param email - O email do usuário.
   */
  sendPasswordReset(email: string): Promise<any> {
    return this.http.get<any>(`${this.url}/${this.userEndpoint.sendPasswordReset(email)}`).toPromise();
  }

}
