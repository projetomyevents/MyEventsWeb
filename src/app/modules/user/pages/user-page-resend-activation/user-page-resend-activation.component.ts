import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../shared/user.service';
import { RoutesConfig } from '../../../../config/routes.config';


@Component({
  selector: 'app-user-page-resend-activation',
  templateUrl: './user-page-resend-activation.component.html',
  styleUrls: ['./user-page-resend-activation.component.scss'],
})
export class UserPageResendActivationComponent implements OnInit {

  email: FormControl;

  info: string;
  resolving: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  async resendActivation(): Promise<void> {
    this.info = null;
    if (this.email.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.email.markAsTouched();
    } else {
      this.resolving = true;
      try {
        const response = await this.userService.resendActivation(this.email.value);

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.home);
      } catch (err) {
        this.resolving = false;
        const message = err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.';
        this.info = message;
        this.snackBar.open(message, 'OK', {panelClass: 'snack-bar-failure'});
      }
    }
  }

}
