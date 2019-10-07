import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { completarEmails } from '../../../core/shared/provedores.email';

class ConfirmacaoSenhaErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return (!!(control && control.invalid && control.parent.dirty)
            || !!(control && control.parent && control.parent.invalid && control.parent.dirty));
  }
}

@Component({
  selector: 'app-usuario-page-cadastro',
  templateUrl: './usuario-page-cadastro.component.html',
  styleUrls: ['./usuario-page-cadastro.component.css']
})
export class UsuarioPageCadastroComponent implements OnInit {

  conta: FormGroup;
  confirmacaoSenhaMatcher = new ConfirmacaoSenhaErrorStateMatcher();
  esconderSenha = true;
  provedoresEmail: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.conta = new FormGroup( {
      nome: new FormControl('', Validators.required),
      email: new FormControl( '', [Validators.required, Validators.email]),
      senhas: new FormGroup({
        senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmacaoSenha: new FormControl('')
      }, this.checarSenha),
      telefone: new FormControl('', Validators.required),
      CPF: new FormControl('', Validators.required)
    });
    this.provedoresEmail = this.conta.get('email').valueChanges
      .pipe(
        map(email => completarEmails(email))
      );
  }

  checarSenha(senhas: FormGroup) {
    return senhas.get('senha').value === senhas.get('confirmacaoSenha').value ? null : {diferentes: true};
  }

  cadastrar() {
  }

}
