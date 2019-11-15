import { Component, isDevMode, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { RoutesConfig } from '../../../config/routes.config';
import { AuthenticationService } from '../../../modules/core/shared/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  repositoryURL = AppConfig.repositoryURL;
  routes = RoutesConfig.routes;
  isDevMode = isDevMode();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
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
  async logout(): Promise<void> {
    this.authenticationService.logout();
    await this.router.navigateByUrl(this.routes.home);
  }

}
