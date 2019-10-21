import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completarEmails } from '../../../core/shared/provedores.email';
import { AutenticacaoService } from '../../../core/shared/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-page-login',
  templateUrl: './usuario-page-login.component.html',
  styleUrls: ['./usuario-page-login.component.scss']
})
export class UsuarioPageLoginComponent implements OnInit {

  @ViewChild('erros', {static: false, read: ElementRef}) erros: ElementRef;

  conta: FormGroup;
  esconderSenha = true;
  emailsCompletos: Observable<string[]>;

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit() {
    this.conta = new FormGroup( {
      email: new FormControl( '', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });

    this.emailsCompletos = this.conta.get('email').valueChanges.pipe(
      ObservableMap(email => completarEmails(email)));
  }

  async logar() {
    if (this.conta.invalid) {
      this.conta.markAllAsTouched();
    } else {
      if (await this.autenticacaoService
        .autenticarUsuario(this.conta.get('email').value, this.conta.get('senha').value)) {
        this.erros.nativeElement.textContent = '';
        await this.router.navigateByUrl('');
      } else {
        this.erros.nativeElement.textContent = 'Conexão não autorizada, email ou senha inválidos.';
      }
    }
  }

}
