import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

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

  contaForm: FormGroup;
  confirmacaoSenhaMatcher = new ConfirmacaoSenhaErrorStateMatcher();
  esconderSenha = true;

  constructor() { }

  ngOnInit() {
    this.contaForm = new FormGroup( {
      nome: new FormControl('', Validators.required),
      email: new FormControl( '', [Validators.required, Validators.email]),
      senhas: new FormGroup({
        senha: new FormControl('', Validators.required),
        confirmacaoSenha: new FormControl('')
      }, this.checarSenha),
      telefone: new FormControl('', Validators.required),
      CPF: new FormControl('', Validators.required)
    });
  }

  checarSenha(senhas: FormGroup) {
    return senhas.get('senha').value === senhas.get('confirmacaoSenha').value ? null : {diferentes: true};
  }

  cadastro() {
  }

}
