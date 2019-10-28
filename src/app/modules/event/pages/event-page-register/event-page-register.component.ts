import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-page-register',
  templateUrl: './event-page-register.component.html',
  styleUrls: ['./event-page-register.component.scss']
})
export class EventPageRegisterComponent implements OnInit {

  conta: FormGroup;

  constructor() { }

  ngOnInit() {
    this.conta = new FormGroup( {
      nome: new FormControl('', Validators.required),
      data: new FormControl( '', Validators.required),
      preco: new FormControl('', Validators.required),
      acompanhantes: new FormControl('', Validators.required),
      traje: new FormControl('', Validators.required),
      idade: new FormControl('', Validators.required),
      cronograma: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl('', Validators.required)
    });
  }

}
