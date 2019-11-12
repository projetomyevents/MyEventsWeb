import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { Event, NewEvent, SimpleEvent } from './event.model';


@Injectable({
  providedIn: 'root'
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
    return this.http.post<any>(`${this.url}/${this.eventEndpoint.create}`, newEvent).toPromise();
  }

  /**
   * Retorna um evento com identificador especificado.
   *
   * @param id - O identificador do evento.
   */
  get(id: number): Promise<Event> {
    return this.http.get<Event>(`${this.url}/${this.eventEndpoint.event(id)}`).toPromise();
  }

  /**
   * Retorna todos os eventos do usuário logado.
   */
  getAll(): Promise<SimpleEvent[]> {
    return this.http.get<SimpleEvent[]>(`${this.url}/${this.eventEndpoint.events}`).toPromise();
  }

}
