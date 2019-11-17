import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { Event, NewEvent, SimpleEvent } from './event.model';
import { Guest, GuestEdit, SimpleGuest } from '../../guest/shared/guest.model';


@Injectable({
  providedIn: 'root',
})
export class EventService {

  url = AppConfig.serverUrl;
  eventEndpoint = EndpointsConfig.event;

  constructor(private http: HttpClient) {
  }

  /**
   * Cria um novo evento.
   *
   * @param newEvent - O novo evento.
   */
  create(newEvent: NewEvent): Promise<any> {
    return this.http.post<any>(`${this.url}/${this.eventEndpoint.postEvent}`, newEvent).toPromise();
  }

  /**
   * Retorna um evento com identificador especificado.
   *
   * @param id - O identificador do evento.
   */
  get(id: number): Promise<Event> {
    return this.http.get<Event>(`${this.url}/${this.eventEndpoint.getEvent(id)}`).toPromise();
  }

  /**
   * Cancela um evento.
   *
   * @param id - O identificador do evento.
   */
  cancel(id: number): Promise<any> {
    return this.http.delete<any>(`${this.url}/${this.eventEndpoint.getEvent(id)}`).toPromise();
  }

  /**
   * Retorna todos os eventos do usuário logado.
   */
  getAll(): Promise<SimpleEvent[]> {
    return this.http.get<SimpleEvent[]>(`${this.url}/${this.eventEndpoint.getEvents}`).toPromise();
  }

  /**
   * Retorna a lista de convidados de um evento.
   *
   * @param id - O identificador do evento.
   */
  getGuests(id: number): Promise<SimpleGuest> {
    return this.http.get<SimpleGuest>(`${this.url}/${this.eventEndpoint.getEventGuests(id)}`).toPromise();
  }

  /**
   * Retorna a lista de convidados de um evento para ser editada.
   *
   * @param id - O identificador do evento.
   */
  getGuestsEdit(id: number): Promise<Guest> {
    return this.http.get<Guest>(`${this.url}/${this.eventEndpoint.getEventGuestsToEdit(id)}`).toPromise();
  }

  /**
   * Atualiza a lista de convidados de um.
   *
   * @param id - O identificador do evento.
   * @param guests - Os convidados atualizados do evento.
   */
  putGuestsEdit(id: number, guests: GuestEdit[]): Promise<any> {
    return this.http.put<any>(`${this.url}/${this.eventEndpoint.getEventGuestsToEdit(id)}`, guests).toPromise();
  }

}
