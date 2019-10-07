import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { completarEmails } from '../../../core/shared/provedores.email';

@Component({
  selector: 'app-usuario-page-login',
  templateUrl: './usuario-page-login.component.html',
  styleUrls: ['./usuario-page-login.component.scss']
})
export class UsuarioPageLoginComponent implements OnInit {

  conta: FormGroup;
  esconderSenha = true;
  provedoresEmail: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.conta = new FormGroup( {
      email: new FormControl( '', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });
    this.provedoresEmail = this.conta.get('email').valueChanges
      .pipe(
        map(email => completarEmails(email))
      );
  }

  logar() {
  }

}
