import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { RoutesConfig } from '../../../../config/routes.config';
import { completeEmails } from '../../../core/shared/email-providers';
import { AuthenticationService } from '../../../core/shared/authentication.service';

@Component({
  selector: 'app-user-page-signin',
  templateUrl: './user-page-signin.component.html',
  styleUrls: ['./user-page-signin.component.scss']
})
export class UserPageSigninComponent implements OnInit {

  userRoutes = RoutesConfig.routes.user;

  userAccount: FormGroup;
  completedEmails: Observable<string[]>;
  info: string;
  resolvingRequest: boolean;
  hidePassword = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userAccount = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.completedEmails = this.userAccount.get('email').valueChanges
      .pipe(ObservableMap((email: string) => completeEmails(email)));
  }

  async signin(): Promise<void> {
    if (this.userAccount.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.userAccount.markAllAsTouched();
    } else {
      this.info = null;
      this.resolvingRequest = true;
      try {
        await this.authenticationService.login(
          this.userAccount.get('email').value, this.userAccount.get('password').value);

        await this.router.navigateByUrl(this.route.snapshot.queryParams.redirect || RoutesConfig.routes.home);
      } catch (err) {
        this.info = 'Falha na autenticação! Verifique se o email e senha digitados estão corretos.';
        this.resolvingRequest = false;
      }
    }
  }

}
