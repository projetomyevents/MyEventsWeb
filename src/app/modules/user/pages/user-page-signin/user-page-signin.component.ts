import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutesConfig } from '../../../../config/routes.config';
import { AuthenticationService } from '../../../core/shared/authentication.service';

@Component({
  selector: 'app-user-page-signin',
  templateUrl: './user-page-signin.component.html',
  styleUrls: ['./user-page-signin.component.scss']
})
export class UserPageSigninComponent implements OnInit {

  userRoutes = RoutesConfig.routes.user;

  user: FormGroup;

  info: string;
  resolving: boolean;
  hidePassword = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async signin(): Promise<void> {
    this.info = null;
    if (this.user.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.user.markAllAsTouched();
    } else {
      this.resolving = true;
      try {
        const rawUser = this.user.getRawValue();
        await this.authenticationService.login(rawUser.email, rawUser.password);

        await this.router.navigateByUrl(this.route.snapshot.queryParams.redirect || RoutesConfig.routes.event.events);
      } catch (err) {
        this.info = err.message;
        this.resolving = false;
      }
    }
  }

}
