import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { complexibilidadeSenha } from '../../../core/shared/complexibilidade.senha';
import { CustomValidators } from '../../../core/shared/custom-validators';

class ConfirmacaoSenhaErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return (!!(control && control.invalid && control.parent.dirty)
            || !!(control && control.parent && control.parent.invalid && control.parent.dirty));
  }
}

@Component({
  selector: 'app-usuario-page-alteracao-senha',
  templateUrl: './usuario-page-alteracao-senha.component.html',
  styleUrls: ['./usuario-page-alteracao-senha.component.scss']
})
export class UsuarioPageAlteracaoSenhaComponent implements OnInit {

  senhas: FormGroup;
  confirmacaoSenhaMatcher = new ConfirmacaoSenhaErrorStateMatcher();
  esconderSenha = true;
  complexibilidadeSenha = {porcentagem: 0, class: ''};

  constructor() { }

  ngOnInit() {
    this.senhas = new FormGroup({
        senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmacaoSenha: new FormControl('')
      }, CustomValidators.different);

    this.senhas.get('senha').valueChanges.subscribe(
      (senha: string) => this.complexibilidadeSenha = complexibilidadeSenha(senha));
  }

  alterarSenha() {
  }

}
