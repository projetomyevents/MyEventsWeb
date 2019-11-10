import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { UserService } from '../../shared/user.service';
import { RoutesConfig } from '../../../../config/routes.config';

@Component({
  selector: 'app-user-page-password-reset',
  templateUrl: './user-page-password-reset.component.html',
  styleUrls: ['./user-page-password-reset.component.scss']
})
export class UserPagePasswordResetComponent implements OnInit {

  passwords: FormGroup;

  info: string;
  resolving: boolean;

  hidePassword = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.passwords = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmedPassword: new FormControl('')
    }, CustomValidators.different);
  }

  async resetPassword(): Promise<void> {
    this.info = null;
    if (this.passwords.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.passwords.markAllAsTouched();
    } else {
      this.resolving = true;
      try {
        const rawPassword = this.passwords.getRawValue();
        const response = await this.userService.resetPassword(this.route.snapshot.params.token, {
          password: rawPassword.password,
          confirmedPassword: rawPassword.confirmedPassword
        });

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.home);
      } catch (err) {
        this.info = err.message;
        this.snackBar.open(err.message, 'OK', {duration: -1, panelClass: 'snack-bar-failure'});
        this.resolving = false;
      }
    }
  }

}
