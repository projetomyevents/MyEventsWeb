import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { completeEmails } from '../../../core/shared/email-providers';
import { passwordStrength } from '../../../core/shared/password-complexity';
import { UserService } from '../../../core/shared/user.service';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { CPFInput } from '../../components/cpf-input/cpf-input.component';
import { PhoneInput } from '../../components/phone-input/phone-input.component';

@Component({
  selector: 'app-user-page-signup',
  templateUrl: './user-page-signup.component.html',
  styleUrls: ['./user-page-signup.component.scss']
})
export class UserPageSignupComponent implements OnInit {

  routesNames = RoutesConfig.routesNames;

  @ViewChild('error', {static: false, read: ElementRef}) error: ElementRef;
  @ViewChild('cpfInput', {static: false}) cpfInput: CPFInput;
  @ViewChild('phoneInput', {static: false}) phoneInput: PhoneInput;

  userAccount: FormGroup;
  completedEmails: Observable<string[]>;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  hidePassword = true;
  passwordStrength = {percentage: 0, class: ''};

  constructor() { }

  ngOnInit(): void {
    this.userAccount = new FormGroup( {
      name: new FormControl('', Validators.required),
      email: new FormControl( '', [Validators.required, Validators.email]),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmedPassword: new FormControl('')
      }, CustomValidators.different),
      phoneNumber: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, CustomValidators.cpf])
    });

    this.completedEmails = this.userAccount.get('email').valueChanges.pipe(ObservableMap((email: string) => completeEmails(email)));

    this.userAccount.get('passwords.password').valueChanges.subscribe(
      (password: string) => this.passwordStrength = passwordStrength(password));
  }

  async signup(): Promise<void> {
    if (this.userAccount.invalid) {
      this.userAccount.markAllAsTouched();
      this.cpfInput.cpf.markAllAsTouched();
      this.phoneInput.phone.markAllAsTouched();
      this.userAccount.get('cpf').updateValueAndValidity();
      this.userAccount.get('phoneNumber').updateValueAndValidity();
    } else {
      console.log(this.userAccount);
    }
  }

}
