import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completeEmails } from '../../../core/shared/email-providers';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { RoutesConfig } from '../../../../config/routes.config';

@Component({
  selector: 'app-user-page-signin',
  templateUrl: './user-page-signin.component.html',
  styleUrls: ['./user-page-signin.component.scss']
})
export class UserPageSigninComponent implements OnInit {

  routesNames = RoutesConfig.routesNames;

  @ViewChild('error', {static: false, read: ElementRef}) error: ElementRef;

  userAccount: FormGroup;
  completedEmails: Observable<string[]>;
  hidePassword = true;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.userAccount = new FormGroup( {
      email: new FormControl( '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.completedEmails = this.userAccount.get('email').valueChanges.pipe(ObservableMap(email => completeEmails(email)));
  }

  async signin(): Promise<void> {
    if (this.userAccount.invalid) {
      this.userAccount.markAllAsTouched();
    } else {
      if (await this.authenticationService.authenticateUser(this.userAccount.get('email').value, this.userAccount.get('password').value)) {
        this.error.nativeElement.textContent = '';
        await this.router.navigateByUrl('');
      } else {
        this.error.nativeElement.textContent = 'Conexão não autorizada, email ou senha inválidos.';
      }
    }
  }

}
