import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NewUser, User } from './user.model';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AppConfig } from '../../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = AppConfig.serverUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/${EndpointsConfig.user.login}`,
      {email, password}, {observe: 'response'}).toPromise();
  }

  register(newUser: NewUser): Promise<void> {
    return this.http.post<void>(`${this.url}/${EndpointsConfig.user.register}`, newUser).toPromise();
  }

  get(email: string): Promise<User> {
    return this.http.get<User>(`${this.url}/${EndpointsConfig.user.getByEmail(email)}`).toPromise();
  }

}
