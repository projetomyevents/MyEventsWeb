import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { completarEmails } from '../../../core/shared/provedores.email';
import { AppConfig } from '../../../../config/app.config';
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
  provedoresEmail: Observable<string[]>;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.conta = new FormGroup( {
      email: new FormControl( '', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });
    this.provedoresEmail = this.conta.get('email').valueChanges.pipe(ObservableMap(email => completarEmails(email)));
  }

  async logar() {
    if (AppConfig.dev) { // TODO: remover esse if antes da entrega
      await this.autenticacaoService.autenticar('gustavoheidemann@gmail.com', '123456');
      await this.router.navigate(['']);
    } else {
      // Apenas tentar autenticar quando não haver erros
      if (this.conta.invalid) {
        this.erros.nativeElement.textContent = this.conta.dirty
          ? 'Resolva os erros antes de tentar entrar.'
          : 'Informe os dados antes de tentar entrar.';
      } else {
        this.erros.nativeElement.textContent = '';
        if (await this.autenticacaoService.autenticar(this.conta.get('email').value, this.conta.get('senha').value)) {
          await this.router.navigate(['']);
        } else {
          this.erros.nativeElement.textContent = 'Conexão não autorizada, email ou senha inválidos.';
        }
      }
    }
  }

}
