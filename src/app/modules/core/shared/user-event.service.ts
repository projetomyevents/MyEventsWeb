import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config/app.config';
import { EndpointsConfig } from '../../../config/endpoints.config';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {

  url = AppConfig.serverUrl;
  eventEndpoint = EndpointsConfig.event;

  constructor(private http: HttpClient) { }

}
