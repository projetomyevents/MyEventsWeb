import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-page-register',
  templateUrl: './event-page-register.component.html',
  styleUrls: ['./event-page-register.component.scss']
})
export class EventPageRegisterComponent implements OnInit {

  userEvent: FormGroup;
  resolving: boolean;
  info: string;

  constructor() { }

  ngOnInit() {
    this.userEvent = new FormGroup({
      // step 1 - informações
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      admissionPrice: new FormControl(''),
      companionLimit: new FormControl('', Validators.required),
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
      attachments: new FormControl('')
    });
  }

  async registerNewUserEvent(): Promise<void> {
    if (this.userEvent.invalid) {
      this.userEvent.markAllAsTouched();
    } else {
      console.log(this.userEvent);
    }
  }

}
