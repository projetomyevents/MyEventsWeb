import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  repoLink = AppConfig.repositoryURL;

  constructor() { }

  ngOnInit() {
  }

}
