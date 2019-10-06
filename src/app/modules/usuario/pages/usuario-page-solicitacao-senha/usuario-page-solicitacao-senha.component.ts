import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-page-solicitacao-senha',
  templateUrl: './usuario-page-solicitacao-senha.component.html',
  styleUrls: ['./usuario-page-solicitacao-senha.component.css']
})
export class UsuarioPageSolicitacaoSenhaComponent implements OnInit {

  email: FormControl;

  constructor() { }

  ngOnInit() {
    this.email = new FormControl( '', [Validators.required, Validators.email]);
  }

  solicitarNovaSenha() {
  }

}
