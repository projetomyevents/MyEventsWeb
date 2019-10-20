import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { forcaSenha } from '../../../core/shared/complexibilidade.senha';

@Component({
  selector: 'app-usuario-page-alteracao-senha',
  templateUrl: './usuario-page-alteracao-senha.component.html',
  styleUrls: ['./usuario-page-alteracao-senha.component.scss']
})
export class UsuarioPageAlteracaoSenhaComponent implements OnInit {

  senhas: FormGroup;
  esconderSenha = true;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  forcaSenha = {porcentagem: 0, class: ''};

  constructor() { }

  ngOnInit() {
    this.senhas = new FormGroup({
        senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmacaoSenha: new FormControl('')
      }, CustomValidators.different);

    this.senhas.get('senha').valueChanges.subscribe((senha: string) => this.forcaSenha = forcaSenha(senha));
  }

  alterarSenha() {
    if (this.senhas.invalid) {
      this.senhas.markAllAsTouched();
    } else { }
  }

}
