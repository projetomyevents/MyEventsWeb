import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { UserService } from '../../shared/user.service';
import { RoutesConfig } from '../../../../config/routes.config';


@Component({
  selector: 'app-user-page-send-password-reset',
  templateUrl: './user-page-send-password-reset.component.html',
  styleUrls: ['./user-page-send-password-reset.component.scss'],
})
export class UserPageSendPasswordResetComponent implements OnInit {

  email: FormControl;

  info: string;
  resolving: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);

    // inserir email automaticamente caso o usuário esteja logado
    if (this.authenticationService.logged()) {
      this.email.setValue(this.authenticationService.userValue.email);
    }
  }

  async sendPasswordReset(): Promise<void> {
    this.info = null;
    if (this.email.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.email.markAsTouched();
    } else {
      this.resolving = true;
      try {
        const response = await this.userService.sendPasswordReset(this.email.value);

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(RoutesConfig.routesNames.home);
      } catch (err) {
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
        this.info = err.message;
        this.resolving = false;
      }
    }
  }

}
