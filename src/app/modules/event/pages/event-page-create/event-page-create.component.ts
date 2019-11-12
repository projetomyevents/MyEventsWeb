import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { City, State } from '../../shared/address.model';
import { AddressService } from '../../shared/address.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { EventService } from '../../shared/event.service';

// TODO: implementar upload de arquivos
@Component({
  selector: 'app-event-page-create',
  templateUrl: './event-page-create.component.html',
  styleUrls: ['./event-page-create.component.scss']
})
export class EventPageCreateComponent implements OnInit {

  event: FormGroup;

  info: string;
  extraInfo: string;
  resolving: boolean;

  today = new Date(Date.now());
  cities: City[];
  states: State[];
  filteredCities: City[];

  constructor(
    private addressService: AddressService,
    private userEventService: EventService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.event = new FormGroup({
      // step 1 - informações básicas
      name: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      companionLimit: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      admissionPrice: new FormControl(''),
      minimumAge: new FormControl(''),
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
      (stateId: number) => this.filteredCities = this.cities.filter((city: City) => city.stateId === stateId));
  }

  async createNewEvent(): Promise<void> {
    this.info = null;
    this.extraInfo = '';
    if (this.event.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.event.markAllAsTouched();
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
        if (rawEvent.attachments === null) {
          rawEvent.attachments = [];
        }

        const response = await this.userEventService.create({
          name: rawEvent.name,
          startDate: rawEvent.startDate,
          companionLimit: rawEvent.companionLimit,
          description: rawEvent.description,
          schedule: rawEvent.schedule,
          admissionPrice: rawEvent.admissionPrice,
          minimumAge: rawEvent.minimumAge,
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

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.event.list);
      } catch (err) {
        this.snackBar.open(err.message, 'OK', {panelClass: 'snack-bar-failure'});
        this.info = err.message;
        if (err.errors) {
          err.errors.forEach(subErr => this.extraInfo += subErr.message);
        }
        this.resolving = false;
      }
    }
  }

  infoIsValid(): boolean {
    const {name, startDate, companionLimit, description, schedule} = this.event.controls;
    return name.valid && startDate.valid && companionLimit.valid && description.valid && schedule.valid;
  }

  localIsValid(): boolean {
    const {cep, state, city, neighborhood, street} = this.event.controls;
    return cep.valid && state.valid && city.valid && neighborhood.valid && street.valid;
  }

}
