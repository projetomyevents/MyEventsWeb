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
   * Retorna a lista de convidados do evento com identificador especificado.
   *
   * @param eventId - O identificador do evento.
   */
  getAll(eventId: number): Promise<Guest | SimpleGuest> {
    return this.http.get<Guest | SimpleGuest>(`${this.url}/${this.guestEndpoint.guestList(eventId)}`).toPromise();
  }

}
