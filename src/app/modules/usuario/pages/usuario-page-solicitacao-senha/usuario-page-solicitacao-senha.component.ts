import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completarEmails } from 'src/app/modules/core/shared/provedores.email';

@Component({
  selector: 'app-usuario-page-solicitacao-senha',
  templateUrl: './usuario-page-solicitacao-senha.component.html',
  styleUrls: ['./usuario-page-solicitacao-senha.component.scss']
})
export class UsuarioPageSolicitacaoSenhaComponent implements OnInit {

  email: FormControl;
  emailsCompletos: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.email = new FormControl( '', [Validators.required, Validators.email]);

    this.emailsCompletos = this.email.valueChanges.pipe(
      ObservableMap((email: string) => completarEmails(email)));
  }

  solicitarNovaSenha() {
    if (this.email.invalid) {
      this.email.markAsTouched();
    } else { }
  }

}
