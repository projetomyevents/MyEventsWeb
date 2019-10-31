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

  repositoryURL = AppConfig.repositoryURL;
  routes = RoutesConfig.routes;
  isDevMode = isDevMode();

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  /**
   * Verifica se o usuário está autenticado.
   */
  logged(): boolean {
    return this.authenticationService.logged();
  }

  /**
   * Desconecta o usuário.
   */
  logout(): void {
    this.authenticationService.logout();
  }

}
