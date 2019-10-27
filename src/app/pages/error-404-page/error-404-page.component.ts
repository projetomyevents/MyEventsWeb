import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-404-page',
  templateUrl: './error-404-page.component.html',
  styleUrls: ['./error-404-page.component.scss']
})
export class Error404PageComponent implements OnInit {

  shortMessage = 'Oops! A página solicitada não foi encontrada.';
  longMessage = 'A URL pode estar incorreta ou a página que você procura não está mais disponível.';

  constructor() { }

  ngOnInit() {
  }

}
