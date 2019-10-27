import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AppConfig } from '../../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private userService: UserService
  ) { }

  /**
   * Autentica um usuário.
   *
   * @param email - O email do usuário.
   * @param password - A senha do usuário.
   */
  authenticateUser(email, password): Promise<boolean> {
    return this.userService.signin(email, password).then(
      (response) => {
        sessionStorage.setItem('username', email);
        AppConfig.token = response.headers.get('authorization');
        return true;
      },
      () => false);
  }

  /**
   * Verifica se o usuário está autenticado.
   */
  userIsLogged(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  /**
   * Desconecta o usuário.
   */
  disconnectUser(): void {
    sessionStorage.removeItem('username');
  }

}
