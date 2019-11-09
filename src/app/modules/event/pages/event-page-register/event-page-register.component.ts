import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CEPInput } from '../../../core/components/cep-input/cep-input.component';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { City, State } from '../../../core/shared/address.model';
import { AddressService } from '../../../core/shared/address.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { EventService } from '../../../core/shared/event.service';

@Component({
  selector: 'app-event-page-register',
  templateUrl: './event-page-register.component.html',
  styleUrls: ['./event-page-register.component.scss']
})
export class EventPageRegisterComponent implements OnInit {

  @ViewChild('cepInput', {static: false}) cepInput: CEPInput;

  event: FormGroup;
  resolving: boolean;
  info: string;
  extraInfo: string;
  cities: City[];
  states: State[];
  filteredCities: City[];
  today = new Date(Date.now());

  constructor(
    private addressService: AddressService,
    private userEventService: EventService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.event = new FormGroup({
      // step 1 - informações básicas
      name: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      companionLimit: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      admissionPrice: new FormControl(''),
      minAge: new FormControl(''),
      attire: new FormControl(''),
      // step 2 - local
      cep: new FormControl('', [Validators.required, CustomValidators.cep]),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl(''),
      complement: new FormControl(''),
      // setp 3 - anexos
      image: new FormControl(''),
      attachments: new FormControl('')
    });

    this.addressService.getAllStates().then((states: State[]) => this.states = states);
    this.addressService.getAllCities().then((cities: City[]) => this.cities = cities);

    this.event.get('state').valueChanges.subscribe(
      (stateId: number) => this.filteredCities = stateId == null
        ? []
        : this.cities.filter((city: City) => city.stateId === stateId));
  }

  async registerNewUserEvent(): Promise<void> {
    this.info = null;
    this.extraInfo = '';
    if (this.event.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.event.markAllAsTouched();
      this.cepInput.cep.markAllAsTouched();
      this.event.get('cep').updateValueAndValidity();
    } else {
      this.resolving = true;
      try {
        const rawEvent = this.event.getRawValue();

        // TODO: tratar valores de inputs com tipo 'file', quando eles forem implementados
        // caso algum atributo ser uma string vazia setá-lo para null
        Object.keys(rawEvent).map((value: string) => {
          if (typeof rawEvent[value] === 'string' && rawEvent[value].length === 0) {
            rawEvent[value] = null;
          }
        });
        // caso não existir nenhum anexo setar o atributo de anexos para uma lista vazia (para não ocorrer erro no back)
        if (rawEvent.attachments === null) { rawEvent.attachments = []; }

        const response = await this.userEventService.register({
          name: rawEvent.name,
          startDate: rawEvent.startDate,
          companionLimit: rawEvent.companionLimit,
          description: rawEvent.description,
          schedule: rawEvent.schedule,
          admissionPrice: rawEvent.admissionPrice,
          minAge: rawEvent.minAge,
          attire: rawEvent.attire,
          cep: rawEvent.cep.toString(),
          cityId: rawEvent.city,
          neighborhood: rawEvent.neighborhood,
          street: rawEvent.street,
          number: rawEvent.number,
          complement: rawEvent.complement,
          image: rawEvent.image,
          attachments: rawEvent.attachments
        });

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'})
          .onAction().toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.event.list);
      } catch (err) {
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
        this.info = err.message;
        if (err.errors) { err.errors.forEach(subErr => this.extraInfo += subErr.message); }
        this.resolving = false;
      }
    }
  }

  infoIsValid(): boolean {
    return this.event.get('name').valid && this.event.get('startDate').valid
      && this.event.get('companionLimit').valid && this.event.get('description').valid
      && this.event.get('schedule').valid;
  }

  localIsValid(): boolean {
    return this.event.get('cep').valid && this.event.get('state').valid
      && this.event.get('city').valid && this.event.get('neighborhood').valid
      && this.event.get('street').valid;
  }

}
