import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { completarEmails } from 'src/app/modules/core/shared/provedores.email';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-page-solicitacao-senha',
  templateUrl: './usuario-page-solicitacao-senha.component.html',
  styleUrls: ['./usuario-page-solicitacao-senha.component.css']
})
export class UsuarioPageSolicitacaoSenhaComponent implements OnInit {

  email: FormControl;
  provedoresEmail: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.email = new FormControl( '', [Validators.required, Validators.email]);
    this.provedoresEmail = this.email.valueChanges
      .pipe(
        map(email => completarEmails(email))
      );
  }

  solicitarNovaSenha() {
  }

}
