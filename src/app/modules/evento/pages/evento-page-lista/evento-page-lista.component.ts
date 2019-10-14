import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-evento-page-lista',
  templateUrl: './evento-page-lista.component.html',
  styleUrls: ['./evento-page-lista.component.scss']
})
export class EventoPageListaComponent implements OnInit {

  conta: FormGroup;

  constructor() { }

  ngOnInit() {

    this.conta = new FormGroup( {
      nome: new FormControl('', Validators.required),
      email: new FormControl( '', Validators.required),
      menssagem: new FormControl( '', Validators.required)
    });

  }

}
