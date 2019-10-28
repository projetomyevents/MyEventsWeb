import { Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { RoutesConfig } from '../../../config/routes.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  /**
   * Define se a rota pode ser acessada pelo usuário atual.
   *
   * @param route - A rota.
   * @param state - Idk.
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = this.authenticationService.userValue;
    if (!!user) {
      // se estiver logado permitir o acesso a rota
      return true;
    }

    // se não estiver logado redirecioná-lo para a página de login com um parametro para a rota desejada
    await this.router.navigate([RoutesConfig.routesNames.user.signin], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
