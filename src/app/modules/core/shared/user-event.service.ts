import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { NewUserEvent, SimpleUserEvent, UserEvent } from './user-event.model';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {

  url = AppConfig.serverUrl;
  eventEndpoint = EndpointsConfig.event;

  constructor(private http: HttpClient) { }

  register(newUserEvent: NewUserEvent): Promise<any> {
    return this.http.post<any>(`${this.url}/${this.eventEndpoint.register}`, newUserEvent).toPromise();
  }

  get(id: number): Promise<UserEvent> {
    return this.http.get<UserEvent>(`${this.url}/${this.eventEndpoint.getEvent(id)}`).toPromise();
  }

  getAll(): Promise<SimpleUserEvent[]> {
    return this.http.get<SimpleUserEvent[]>(`${this.url}/${this.eventEndpoint.getEvents}`).toPromise();
  }

}
