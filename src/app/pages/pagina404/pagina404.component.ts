import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina404',
  templateUrl: './pagina404.component.html',
  styleUrls: ['./pagina404.component.scss']
})
export class Pagina404Component implements OnInit {

  shortMsg = 'Oops! A página solicitada não foi encontrada.';
  longMsg = 'A URL pode estar incorreta ou a página que você procura não está mais disponível.';

  constructor() { }

  ngOnInit() {
  }

}
