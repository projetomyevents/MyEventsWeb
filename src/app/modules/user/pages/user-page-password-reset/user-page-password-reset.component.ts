import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { UserService } from '../../../core/shared/user.service';

@Component({
  selector: 'app-user-page-password-reset',
  templateUrl: './user-page-password-reset.component.html',
  styleUrls: ['./user-page-password-reset.component.scss']
})
export class UserPagePasswordResetComponent implements OnInit {

  passwords: FormGroup;
  resolving: boolean;
  info: string;
  hidePassword = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

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
        const response = await this.userService.resetPassword(this.route.snapshot.params.token, {
          password: this.passwords.get('password').value,
          confirmedPassword: this.passwords.get('confirmedPassword').value
        });

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl('');
      } catch (err) {
        this.info = err.message;
        this.snackBar.open(err.message, 'OK', {duration: -1, panelClass: 'snack-bar-failure'});
        this.resolving = false;
      }
    }
  }

}
