import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-page-login',
  templateUrl: './usuario-page-login.component.html',
  styleUrls: ['./usuario-page-login.component.css']
})
export class UsuarioPageLoginComponent implements OnInit {

  conta: FormGroup;
  esconderSenha = true;

  constructor() { }

  ngOnInit() {
    this.conta = new FormGroup( {
      email: new FormControl( '', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });
  }

  logar() {
  }

}
