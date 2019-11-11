import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../core/shared/authentication.service';
import { RoutesConfig } from '../../../config/routes.config';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  /**
   * Define se a rota pode ser acessada pelo usuário atual.
   *
   * @param route - A rota.
   * @param state - Idk.
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(route.params);
    return true;
  }

}
