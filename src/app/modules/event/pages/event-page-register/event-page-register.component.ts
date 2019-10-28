import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUser } from '../../../core/shared/user.model';
import { RoutesConfig } from '../../../../config/routes.config';

@Component({
  selector: 'app-event-page-register',
  templateUrl: './event-page-register.component.html',
  styleUrls: ['./event-page-register.component.scss']
})
export class EventPageRegisterComponent implements OnInit {

  @ViewChild('error', {static: false, read: ElementRef}) error: ElementRef;

  userEvent: FormGroup;
  resolvingRequest: boolean;

  constructor() { }

  ngOnInit() {
    this.userEvent = new FormGroup({
      // step 1 - informações
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      ticketPrice: new FormControl(''),
      maxCompanions: new FormControl('', Validators.required),
      attire: new FormControl(''),
      minAge: new FormControl(''),
      schedule: new FormControl('', Validators.required),
      // step 2 - local
      CEP: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      neighbourhood: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl(''),
      complement: new FormControl(''),
      // setp 3 - arquivos
      image: new FormControl(''),
      attachment: new FormControl('')
    });
  }

  async registerNewUserEvent(): Promise<void> {
    if (this.userEvent.invalid) {
      this.userEvent.markAllAsTouched();
    } else {
      // this.resolvingRequest = true;
    }
  }

}
