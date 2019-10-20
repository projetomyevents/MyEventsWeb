import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { completarEmails } from '../../../core/shared/provedores.email';
import { forcaSenha } from '../../../core/shared/complexibilidade.senha';

@Component({
  selector: 'app-usuario-page-cadastro',
  templateUrl: './usuario-page-cadastro.component.html',
  styleUrls: ['./usuario-page-cadastro.component.scss']
})
export class UsuarioPageCadastroComponent implements OnInit {

  conta: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  esconderSenha = true;
  emailsCompletos: Observable<string[]>;
  forcaSenha = {porcentagem: 0, class: ''};

  constructor() { }

  ngOnInit() {
    this.conta = new FormGroup( {
      nome: new FormControl('', Validators.required),
      email: new FormControl( '', [Validators.required, Validators.email]),
      senhas: new FormGroup({
        senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmacaoSenha: new FormControl('')
      }, CustomValidators.different),
      telefone: new FormControl('', Validators.required),
      CPF: new FormControl('', Validators.required)
    });

    this.emailsCompletos = this.conta.get('email').valueChanges.pipe(
      ObservableMap((email: string) => completarEmails(email)));

    this.conta.get('senhas.senha').valueChanges.subscribe(
      (senha: string) => this.forcaSenha = forcaSenha(senha));
  }

  cadastrar() {
    if (this.conta.invalid) {
      this.conta.markAllAsTouched();
    } else { }
  }

}
