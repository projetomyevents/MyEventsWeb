import { Component, isDevMode, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { RoutesConfig } from '../../../config/routes.config';
import { AuthenticationService } from '../../../modules/core/shared/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  repoLink = AppConfig.repositoryURL;
  routesNames = RoutesConfig.routesNames;
  dev = isDevMode();

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  /**
   * Verifica se o usuário está autenticado.
   */
  userIsLogged(): boolean {
    return this.authenticationService.logged();
  }

  /**
   * Desconecta o usuário.
   */
  disconnectUser(): void {
    this.authenticationService.logout();
  }

}
