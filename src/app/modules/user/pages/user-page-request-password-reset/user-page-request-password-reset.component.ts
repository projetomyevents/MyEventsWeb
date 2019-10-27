import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completeEmails } from 'src/app/modules/core/shared/email-providers';

@Component({
  selector: 'app-user-page-request-password-reset',
  templateUrl: './user-page-request-password-reset.component.html',
  styleUrls: ['./user-page-request-password-reset.component.scss']
})
export class UserPageRequestPasswordResetComponent implements OnInit {

  email: FormControl;
  completedEmails: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.email = new FormControl( '', [Validators.required, Validators.email]);

    this.completedEmails = this.email.valueChanges.pipe(ObservableMap((email: string) => completeEmails(email)));
  }

  requestPasswordReset(): void {
    if (this.email.invalid) {
      this.email.markAsTouched();
    } else { }
  }

}
