import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { Observable } from 'rxjs';
import { map as ObservableMap } from 'rxjs/operators';
import { ParentErrorStateMatcher } from '../../../core/shared/custom-state-matchers';
import { completarEmails } from '../../../core/shared/provedores.email';
import { forcaSenha } from '../../../core/shared/complexibilidade.senha';
import { UsuarioService } from '../../../core/shared/usuario.service';
import { AutenticacaoService } from '../../../core/shared/autenticacao.service';

@Component({
  selector: 'app-usuario-page-cadastro',
  templateUrl: './usuario-page-cadastro.component.html',
  styleUrls: ['./usuario-page-cadastro.component.scss']
})
export class UsuarioPageCadastroComponent implements OnInit {

  @ViewChild('erros', {static: false, read: ElementRef}) erros: ElementRef;

  usuario: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  esconderSenha = true;
  emailsCompletos: Observable<string[]>;
  forcaSenha = {porcentagem: 0, class: ''};

  constructor(private usuarioService: UsuarioService,
              private autenticacaoService: AutenticacaoService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new FormGroup( {
      nome: new FormControl('', Validators.required),
      email: new FormControl( '', [Validators.required, Validators.email]),
      senhas: new FormGroup({
        senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmacaoSenha: new FormControl('')
      }, CustomValidators.different),
      telefone: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, CustomValidators.cpf])
    });

    this.emailsCompletos = this.usuario.get('email').valueChanges.pipe(
      ObservableMap((email: string) => completarEmails(email)));

    this.usuario.get('senhas.senha').valueChanges.subscribe(
      (senha: string) => this.forcaSenha = forcaSenha(senha));
  }

  async cadastrar() {
    if (this.usuario.invalid) {
      this.usuario.markAllAsTouched();
    } else {
      const rawUsuario = this.usuario.getRawValue();
      const usuario = {
        nome: rawUsuario.nome,
        senha: rawUsuario.senhas.senha,
        email: rawUsuario.email,
        cpf: rawUsuario.cpf.toString(),
        celular: rawUsuario.telefone
      };
      if (await this.usuarioService.cadastrar(usuario)) {
        // logar usuário automaticamente depois de um cadastro bem sucedido
        await this.autenticacaoService.autenticarUsuario(usuario.email, usuario.senha);
        await this.router.navigateByUrl('');
      } else {
        // TODO: informar porque não foi possível cadastrar
        this.erros.nativeElement.textContent = 'Um erro ocorreu!';
      }
    }
  }

}
