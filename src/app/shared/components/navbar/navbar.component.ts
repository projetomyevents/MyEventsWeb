import { Component, isDevMode, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { RoutesConfig } from '../../../config/routes.config';
import { AuthenticationService } from '../../../modules/core/shared/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  repositoryURL = AppConfig.repositoryURL;
  routes = RoutesConfig.routes;
  isDevMode = isDevMode();

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

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
