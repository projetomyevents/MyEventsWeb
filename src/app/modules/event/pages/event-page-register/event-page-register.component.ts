import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CEPInput } from '../../components/cep-input/cep-input.component';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { City, State } from '../../../core/shared/address.model';
import { AddressService } from '../../../core/shared/address.service';

@Component({
  selector: 'app-event-page-register',
  templateUrl: './event-page-register.component.html',
  styleUrls: ['./event-page-register.component.scss']
})
export class EventPageRegisterComponent implements OnInit {

  @ViewChild('cepInput', {static: false}) cepInput: CEPInput;

  userEvent: FormGroup;
  resolving: boolean;
  info: string;
  extraInfo: string;
  cities: City[];
  states: State[];
  filteredCities: City[];
  today = new Date(Date.now());

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.userEvent = new FormGroup({
      // step 1 - informações básicas
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      admissionPrice: new FormControl(''),
      companionLimit: new FormControl('', Validators.required),
      attire: new FormControl(''),
      minAge: new FormControl(''),
      schedule: new FormControl('', Validators.required),
      // step 2 - local
      cep: new FormControl('', [Validators.required, CustomValidators.cep]),
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

    this.addressService.getAllStates().then((states: State[]) => this.states = states);
    this.addressService.getAllCities().then((cities: City[]) => this.cities = cities);

    this.userEvent.get('state').valueChanges.subscribe(
      (stateId: number) => this.filteredCities = stateId == null
        ? []
        : this.cities.filter((city: City) => city.stateId === stateId));
  }

  async registerNewUserEvent(): Promise<void> {
    this.info = null;
    this.extraInfo = '';
    if (this.userEvent.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.userEvent.markAllAsTouched();
      this.cepInput.cep.markAllAsTouched();
      this.userEvent.get('cep').updateValueAndValidity();
    } else {
      this.resolving = true;
      try {
        console.log(this.userEvent);
      } catch (err) {
        this.info = err.message;
        if (err.errors) { err.errors.forEach(subErr => this.extraInfo += subErr.message); }
        this.resolving = false;
      }
    }
  }

  infoIsValid(): boolean {
    return this.userEvent.get('name').valid && this.userEvent.get('description').valid
      && this.userEvent.get('startDate').valid && this.userEvent.get('companionLimit').valid
      && this.userEvent.get('schedule').valid;
  }

  localIsValid(): boolean {
    return this.userEvent.get('cep').valid && this.userEvent.get('state').valid
      && this.userEvent.get('city').valid && this.userEvent.get('neighbourhood').valid
      && this.userEvent.get('street').valid;
  }

}
