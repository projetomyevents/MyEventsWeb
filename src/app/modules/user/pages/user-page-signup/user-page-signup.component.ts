import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RoutesConfig } from '../../../../config/routes.config';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-user-page-signup',
  templateUrl: './user-page-signup.component.html',
  styleUrls: ['./user-page-signup.component.scss'],
})
export class UserPageSignupComponent implements OnInit {

  userRoutes = RoutesConfig.routes.user;

  user: FormGroup;

  info: string;
  extraInfo: string[];
  resolving: boolean;

  hidePassword = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required/*, Validators.email*/]),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
        confirmedPassword: new FormControl(''),
      }, CustomValidators.different),
      phone: new FormControl('', [Validators.required, CustomValidators.phone]),
      cpf: new FormControl('', [Validators.required, CustomValidators.cpf]),
    });
  }

  async signup(): Promise<void> {
    this.info = null;
    this.extraInfo = null;
    if (this.user.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.user.markAllAsTouched();
    } else {
      this.resolving = true;
      try {
        const rawUser = this.user.getRawValue();
        const response = await this.userService.register({
          email: rawUser.email,
          password: rawUser.passwords.password,
          confirmedPassword: rawUser.passwords.confirmedPassword,
          name: rawUser.name,
          cpf: rawUser.cpf.toString(),
          phone: rawUser.phone.toString(),
        });

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(this.userRoutes.signin);
      } catch (err) {
        this.resolving = false;
        const message = err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.';
        if (err.subErrors) {
          this.extraInfo = err.subErrors.map((subErr: any) => subErr.message);
        }
        this.info = message;
        this.snackBar.open(message, 'OK', {panelClass: 'snack-bar-failure'});
      }
    }
  }

}
