import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { Guest, SimpleGuest } from './guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  url = AppConfig.serverUrl;
  guestEndpoint = EndpointsConfig.guest;

  constructor(private http: HttpClient) { }

  /**
   * Retorna a lista de convidados de um evento.
   *
   * @param id - O identificador do evento.
   */
  getAll(id: number): Promise<SimpleGuest> {
    return this.http.get<SimpleGuest>(`${this.url}/${this.guestEndpoint.guests(id)}`).toPromise();
  }

  /**
   * Retorna a lista de convidados de um evento para ser editada.
   *
   * @param id - O identificador do evento.
   */
  getAllEdit(id: number): Promise<Guest> {
    return this.http.get<Guest>(`${this.url}/${this.guestEndpoint.guestsEdit(id)}`).toPromise();
  }

}
