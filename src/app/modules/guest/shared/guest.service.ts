import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';


@Injectable({
  providedIn: 'root',
})
export class GuestService {

  url = AppConfig.serverUrl;
  guestEndpoint = EndpointsConfig.guest;

  constructor(private http: HttpClient) {
  }

}
