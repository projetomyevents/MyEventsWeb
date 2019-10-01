import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class GuardaAutenticacaoService implements CanActivate {

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.autenticacaoService.usuarioLogado()) {
      return true;
    }

    // caso o usuário não autenticado tente acessar rotas como lista de eventos ele será redirecionado a página de login
    await this.router.navigate(['login']);
    return false;
  }

}
