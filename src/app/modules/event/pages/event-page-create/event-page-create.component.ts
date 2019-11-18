import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { City, State } from '../../shared/address.model';
import { AddressService } from '../../shared/address.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { EventService } from '../../shared/event.service';


@Component({
  selector: 'app-event-page-create',
  templateUrl: './event-page-create.component.html',
  styleUrls: ['./event-page-create.component.scss'],
})
export class EventPageCreateComponent implements OnInit {

  event: FormGroup;

  info: string;
  extraInfo: string[];
  resolving: boolean;

  today = new Date(Date.now());
  cities: City[];
  states: State[];
  filteredCities: City[];

  constructor(
    private addressService: AddressService,
    private userEventService: EventService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
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
      image: new FormControl(null),
      attachments: new FormControl(null),
    });

    this.addressService.getAllStates().then((states: State[]) => this.states = states);
    this.addressService.getAllCities().then((cities: City[]) => this.cities = cities);

    this.event.get('state').valueChanges.subscribe(
      (stateId: number) => this.filteredCities = this.cities.filter((city: City) => city.stateId === stateId));
  }

  async createNewEvent(): Promise<void> {
    this.info = null;
    this.extraInfo = null;
    if (this.event.invalid) {
      this.info = 'Preencha os campos requeridos.';
      this.event.markAllAsTouched();
    } else {
      this.resolving = true;
      try {
        const rawEvent = this.event.getRawValue();

        // caso algum atributo ser uma string vazia setá-lo para null
        Object.keys(rawEvent).map((key: string) => {
          if (typeof rawEvent[key] === 'string' && rawEvent[key].length === 0) {
            rawEvent[key] = null;
          }
        });

        // TODO: implementar upload de arquivos
        rawEvent.image = null;
        rawEvent.attachments = [];

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
          attachments: rawEvent.attachments,
        });

        await this.snackBar.open(response.message, 'OK', {duration: -1, panelClass: 'snack-bar-success'}).onAction()
          .toPromise();

        await this.router.navigateByUrl(RoutesConfig.routes.event.events);
      } catch (err) {
        this.resolving = false;
        const message = err.status ? err.message : 'Erro interno no servidor. Tente mais tarde.';
        if (err.subErrors) {
          this.extraInfo = err.subErrors.map((subErr: any) => subErr.message);
        }
        this.info = message;
        this.snackBar.open(message, 'OK', {panelClass: 'snack-bar-failure'});
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
