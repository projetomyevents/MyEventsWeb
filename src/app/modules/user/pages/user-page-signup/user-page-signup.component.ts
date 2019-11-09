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
import { CPFInput } from '../../../core/components/cpf-input/cpf-input.component';
import { PhoneInput } from '../../../core/components/phone-input/phone-input.component';
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
  resolving: boolean;
  info: string;
  extraInfo: string;
  hidePassword = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

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
  }

  async signup(): Promise<void> {
    this.info = null;
    this.extraInfo = '';
    if (this.userAccount.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.userAccount.markAllAsTouched();
      this.cpfInput.cpf.markAllAsTouched();
      this.phoneInput.phone.markAllAsTouched();
      this.userAccount.get('cpf').updateValueAndValidity();
      this.userAccount.get('phone').updateValueAndValidity();
    } else {
      this.resolving = true;
      try {
        const rawUser = this.userAccount.getRawValue();
        const response = await this.userService.register({
          email: rawUser.email,
          password: rawUser.passwords.password,
          confirmedPassword: rawUser.passwords.confirmedPassword,
          name: rawUser.name,
          cpf: rawUser.cpf.toString(),
          phone: rawUser.phone.toString()
        });

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'})
          .onAction().toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.home);
      } catch (err) {
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
        this.info = err.message;
        if (err.errors) { err.errors.forEach(subErr => this.extraInfo += subErr.message); }
        this.resolving = false;
      }
    }
  }

}
