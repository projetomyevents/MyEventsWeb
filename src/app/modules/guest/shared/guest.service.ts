import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { Guest, GuestUpdate } from './guest.model';


@Injectable({
  providedIn: 'root',
})
export class GuestService {

  url = AppConfig.serverUrl;
  guestEndpoint = EndpointsConfig.guest;

  constructor(private http: HttpClient) {
  }

  get(token: string): Promise<Guest> {
    return this.http.get<Guest>(`${this.url}/${this.guestEndpoint.getGuestStatus(token)}`).toPromise();
  }

  update(token: string, guest: GuestUpdate): Promise<any> {
    return this.http.put<any>(`${this.url}/${this.guestEndpoint.getGuestStatus(token)}`, guest).toPromise();
  }

}
