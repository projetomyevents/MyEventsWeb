import { Injectable } from '@angular/core';
import { City, State } from './address.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  url = AppConfig.serverUrl;
  addressEndpoint = EndpointsConfig.address;

  constructor(private http: HttpClient) {
  }

  getAllCities(): Promise<City[]> {
    return this.http.get<City[]>(`${this.url}/${this.addressEndpoint.cities}`).toPromise();
  }

  getAllStates(): Promise<State[]> {
    return this.http.get<State[]>(`${this.url}/${this.addressEndpoint.states}`).toPromise();
  }

}
