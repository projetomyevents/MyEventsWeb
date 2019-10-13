import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento-page-criacao',
  templateUrl: './evento-page-criacao.component.html',
  styleUrls: ['./evento-page-criacao.component.scss']
})
export class EventoPageCriacaoComponent implements OnInit {

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
