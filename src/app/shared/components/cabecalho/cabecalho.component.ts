import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { RoutesConfig } from '../../../config/routes.config';
import { AutenticacaoService } from '../../../modules/core/shared/autenticacao.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  repoLink = AppConfig.repositoryURL;
  routerNames = RoutesConfig.routesNames;
  dev = AppConfig.dev;

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
  }

}
