import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { passwordStrength } from '../../../core/shared/password-complexity';

@Component({
  selector: 'app-user-page-password-reset',
  templateUrl: './user-page-password-reset.component.html',
  styleUrls: ['./user-page-password-reset.component.scss']
})
export class UserPagePasswordResetComponent implements OnInit {

  passwords: FormGroup;
  hidePassword = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  passwordStrength = {percentage: 0, class: ''};

  constructor() { }

  ngOnInit(): void {
    this.passwords = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmedPassword: new FormControl('')
      }, CustomValidators.different);

    this.passwords.get('password').valueChanges.subscribe((password: string) => this.passwordStrength = passwordStrength(password));
  }

  resetPassword(): void {
    if (this.passwords.invalid) {
      this.passwords.markAllAsTouched();
    } else { }
  }

}
