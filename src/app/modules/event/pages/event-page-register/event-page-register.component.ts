import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CEPInput } from '../../components/cep-input/cep-input.component';
import { CustomValidators } from '../../../core/shared/custom-validators';
import { City, State } from '../../../core/shared/address.model';
import { AddressService } from '../../../core/shared/address.service';
import { AuthenticationService } from '../../../core/shared/authentication.service';
import { RoutesConfig } from '../../../../config/routes.config';
import { UserEventService } from '../../../core/shared/user-event.service';

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

  constructor(
    private addressService: AddressService,
    private userEventService: UserEventService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userEvent = new FormGroup({
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
        const rawUserEvent = this.userEvent.getRawValue();

        // TODO: tratar valores de inputs com tipo 'file', quando eles forem implementados
        // caso algum atributo ser uma string vazia setá-lo para null
        Object.keys(rawUserEvent).map((value: string) => {
          if (typeof rawUserEvent[value] === 'string' && rawUserEvent[value].length === 0) {
            rawUserEvent[value] = null;
          }
        });
        // caso não existir nenhum anexo setar o atributo de anexos para uma lista vazia (para não ocorrer erro no back)
        if (rawUserEvent.attachments === null) { rawUserEvent.attachments = []; }

        const response = await this.userEventService.register({
          name: rawUserEvent.name,
          startDate: rawUserEvent.startDate,
          companionLimit: rawUserEvent.companionLimit,
          description: rawUserEvent.description,
          schedule: rawUserEvent.schedule,
          admissionPrice: rawUserEvent.admissionPrice,
          minAge: rawUserEvent.minAge,
          attire: rawUserEvent.attire,
          cep: rawUserEvent.cep.toString(),
          cityId: rawUserEvent.city,
          neighborhood: rawUserEvent.neighborhood,
          street: rawUserEvent.street,
          number: rawUserEvent.number,
          complement: rawUserEvent.complement,
          image: rawUserEvent.image,
          attachments: rawUserEvent.attachments,
          userEmail: this.authenticationService.userValue.email
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
    return this.userEvent.get('name').valid && this.userEvent.get('startDate').valid
      && this.userEvent.get('companionLimit').valid && this.userEvent.get('description').valid
      && this.userEvent.get('schedule').valid;
  }

  localIsValid(): boolean {
    return this.userEvent.get('cep').valid && this.userEvent.get('state').valid
      && this.userEvent.get('city').valid && this.userEvent.get('neighborhood').valid
      && this.userEvent.get('street').valid;
  }

}
