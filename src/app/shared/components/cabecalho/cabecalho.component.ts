import { Component, isDevMode, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { RoutesConfig } from '../../../config/routes.config';
import { AutenticacaoService } from '../../../modules/core/shared/autenticacao.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  repoLink = AppConfig.repositoryURL;
  routerNames = RoutesConfig.routesNames;
  dev = isDevMode();

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
  }

  usuarioLogado(): boolean {
    return this.autenticacaoService.usuarioLogado()
  }

  desconectarUsuario(): void {
    this.autenticacaoService.desconectarUsuario();
  }

}
