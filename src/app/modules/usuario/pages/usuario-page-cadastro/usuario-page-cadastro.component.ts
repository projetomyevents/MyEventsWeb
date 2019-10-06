import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-page-cadastro',
  templateUrl: './usuario-page-cadastro.component.html',
  styleUrls: ['./usuario-page-cadastro.component.css']
})
export class UsuarioPageCadastroComponent implements OnInit {

  contaForm: FormGroup;
  esconderSenha = true;

  constructor() { }

  ngOnInit() {
    this.contaForm = new FormGroup( {
      nome: new FormControl('', Validators.required),
      email: new FormControl( '', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      CPF: new FormControl('', Validators.required)

    });
  }

  cadastro() {

  }

}
