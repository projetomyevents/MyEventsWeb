import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completeEmails } from '../../../core/shared/email-providers';
import { RoutesConfig } from '../../../../config/routes.config';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { Router } from '@angular/router';

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
  resolvingRequest: boolean;
  hidePassword = true;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.userAccount = new FormGroup( {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.completedEmails = this.userAccount.get('email').valueChanges
      .pipe(ObservableMap(email => completeEmails(email)));
  }

  async signin(): Promise<void> {
    if (this.userAccount.invalid) {
      this.userAccount.markAllAsTouched();
    } else {
      this.resolvingRequest = true;
      try {
        await this.authenticationService.login(
          this.userAccount.get('email').value, this.userAccount.get('password').value);

        await this.router.navigateByUrl(RoutesConfig.routes.home);  // redirecionar o usuário a página inicial
      } catch (err) {
        this.error.nativeElement.textContent = err.message;  // mostrar mensagem de erro ao usuário
        this.resolvingRequest = false;
      }
    }
  }

}
