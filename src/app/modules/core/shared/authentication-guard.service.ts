import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { RoutesConfig } from '../../../config/routes.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Checa se a rota pode ser acessada.
   *
   * @param route - A rota.
   * @param state - Idk.
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authenticationService.userIsLogged()) {
      return true;
    }

    // caso o usuário não autenticado tente acessar rotas protegidas por autenticação ele será redirecionado a página de login
    await this.router.navigateByUrl(RoutesConfig.routesNames.user.signin);
    return false;
  }

}
