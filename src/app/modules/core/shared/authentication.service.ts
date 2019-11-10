import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SimpleUser } from '../../user/shared/user.model';
import { UserService } from '../../user/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject = new BehaviorSubject<SimpleUser>(JSON.parse(localStorage.getItem('user')));
  public user = this.userSubject.asObservable();

  constructor(private userService: UserService) {
  }

  /**
   * Retorna o usuário logado.
   */
  public get userValue(): SimpleUser {
    return this.userSubject.value;
  }

  /**
   * Autentica um usuário.
   *
   * @param email - O email do usuário.
   * @param password - A senha do usuário.
   */
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.userService.login(email, password);
      const token = response.headers.get('authorization');

      // resgatar as informações do usuário
      const user = response.body;
      user.token = token;

      // guardar as informações do usuário
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);

      return user;
    } catch (err) {
      return await Promise.reject(err);
    }
  }

  /**
   * Verifica se o usuário está autenticado.
   */
  logged(): boolean {
    return !!localStorage.getItem('user');
  }

  /**
   * Desconecta o usuário.
   */
  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}
