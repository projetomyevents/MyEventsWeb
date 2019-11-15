import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { City, State } from './address.model';


@Injectable({
  providedIn: 'root',
})
export class AddressService {

  url = AppConfig.serverUrl;
  addressEndpoint = EndpointsConfig.address;

  constructor(private http: HttpClient) {
  }

  /**
   * Retorna todos as cidades do Brasil.
   */
  getAllCities(): Promise<City[]> {
    return this.http.get<City[]>(`${this.url}/${this.addressEndpoint.getCities}`).toPromise();
  }

  /**
   * Retorna todos os estados do Brasil.
   */
  getAllStates(): Promise<State[]> {
    return this.http.get<State[]>(`${this.url}/${this.addressEndpoint.getStates}`).toPromise();
  }

}
