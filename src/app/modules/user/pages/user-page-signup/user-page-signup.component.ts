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

@Component({
  selector: 'app-user-page-signup',
  templateUrl: './user-page-signup.component.html',
  styleUrls: ['./user-page-signup.component.scss']
})
export class UserPageSignupComponent implements OnInit {

  routesNames = RoutesConfig.routesNames;

  @ViewChild('error', {static: false, read: ElementRef}) error: ElementRef;

  userAccount: FormGroup;
  completedEmails: Observable<string[]>;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  hidePassword = true;
  passwordStrength = {percentage: 0, class: ''};

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

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
    } else {
      const rawUser = this.userAccount.getRawValue();
      const user = {
        email: rawUser.email,
        password: rawUser.passwords.password,
        name: rawUser.nome,
        cpf: rawUser.cpf.toString(),
        phoneNumber: rawUser.telefone
      };
      if (await this.userService.signup(user)) {
        // logar usuário automaticamente depois de um cadastro bem sucedido
        await this.authenticationService.authenticateUser(user.email, user.password);
        await this.router.navigateByUrl('');
      } else {
        // TODO: informar porque não foi possível cadastrar
        this.error.nativeElement.textContent = 'Um erro ocorreu!';
      }
    }
  }

}
