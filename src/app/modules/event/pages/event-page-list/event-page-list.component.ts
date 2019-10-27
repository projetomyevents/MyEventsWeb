import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-page-list',
  templateUrl: './event-page-list.component.html',
  styleUrls: ['./event-page-list.component.scss']
})
export class EventPageListComponent implements OnInit {

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
