import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { RoutesConfig } from '../../../../config/routes.config';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { completeEmails } from '../../../core/shared/email-providers';
import { passwordStrength } from '../../../core/shared/password-complexity';
import { CPFInput } from '../../components/cpf-input/cpf-input.component';
import { PhoneInput } from '../../components/phone-input/phone-input.component';
import { UserService } from '../../../core/shared/user.service';

@Component({
  selector: 'app-user-page-signup',
  templateUrl: './user-page-signup.component.html',
  styleUrls: ['./user-page-signup.component.scss']
})
export class UserPageSignupComponent implements OnInit {

  userRoutes = RoutesConfig.routes.user;

  @ViewChild('cpfInput', {static: false}) cpfInput: CPFInput;
  @ViewChild('phoneInput', {static: false}) phoneInput: PhoneInput;

  userAccount: FormGroup;
  completedEmails: Observable<string[]>;
  resolvingRequest: boolean;
  info: string;
  hidePassword = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  passwordStrength = {percentage: 0, class: ''};

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userAccount = new FormGroup( {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmedPassword: new FormControl('')
      }, CustomValidators.different),
      phone: new FormControl('', [Validators.required, CustomValidators.phone]),
      cpf: new FormControl('', [Validators.required, CustomValidators.cpf])
    });

    this.completedEmails = this.userAccount.get('email').valueChanges
      .pipe(ObservableMap((email: string) => completeEmails(email)));

    this.userAccount.get('passwords.password').valueChanges
      .subscribe((password: string) => this.passwordStrength = passwordStrength(password));
  }

  async signup(): Promise<void> {
    if (this.userAccount.invalid) {
      this.userAccount.markAllAsTouched();
      this.cpfInput.cpf.markAllAsTouched();
      this.phoneInput.phone.markAllAsTouched();
      this.userAccount.get('cpf').updateValueAndValidity();
      this.userAccount.get('phone').updateValueAndValidity();
    } else {
      this.resolvingRequest = true;
      try {
        const rawUser = this.userAccount.getRawValue();
        await this.userService.register({
          email: rawUser.email,
          password: rawUser.passwords.password,
          confirmedPassword: rawUser.passwords.confirmedPassword,
          name: rawUser.name,
          cpf: rawUser.cpf.toString(),
          phone: rawUser.phone.toString()
        });

        await this.snackBar.open('Cadastrado com sucesso! Verifique seu email e ative sua conta.', 'OK',
          {duration: -1, panelClass: 'snack-bar-success'}).onAction().toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.home);
      } catch (err) {
        this.snackBar.open('Falha na tentativa de cadastro!', 'OK', {panelClass: 'snack-bar-failure'});
        this.info = err.message;
        if (err.errors) { err.errors.forEach(subErr => this.info += subErr.message); }
        this.resolvingRequest = false;
      }
    }
  }

}
