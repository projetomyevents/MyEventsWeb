import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completeEmails } from 'src/app/modules/core/shared/email-providers';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { UserService } from '../../../core/shared/user.service';

@Component({
  selector: 'app-user-page-send-password-reset',
  templateUrl: './user-page-send-password-reset.component.html',
  styleUrls: ['./user-page-send-password-reset.component.scss']
})
export class UserPageSendPasswordResetComponent implements OnInit {

  email: FormControl;
  completedEmails: Observable<string[]>;
  resolving: boolean;
  info: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.completedEmails = this.email.valueChanges.pipe(ObservableMap((email: string) => completeEmails(email)));

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

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'})
          .onAction().toPromise();

        await this.router.navigateByUrl('');
      } catch (err) {
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
        this.info = err.message;
        this.resolving = false;
      }
    }
  }

}
