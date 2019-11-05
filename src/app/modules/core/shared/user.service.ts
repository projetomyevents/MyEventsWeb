import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NewPassword, NewUser, User } from './user.model';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AppConfig } from '../../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = AppConfig.serverUrl;
  userEndpoint = EndpointsConfig.user;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/${this.userEndpoint.login}`,
      {email, password}, {observe: 'response'}).toPromise();
  }

  register(newUser: NewUser): Promise<any> {
    return this.http.post<any>(`${this.url}/${this.userEndpoint.register}`, newUser).toPromise();
  }

  get(email: string): Promise<User> {
    return this.http.get<User>(`${this.url}/${this.userEndpoint.getByEmail(email)}`).toPromise();
  }

  confirm(token: string): Promise<any> {
    return this.http.get<any>(`${this.url}/${this.userEndpoint.getConfirm(token)}`).toPromise();
  }

  resendConfirmation(email: string): Promise<any> {
    return this.http.get<any>(`${this.url}/${this.userEndpoint.getResendConfirmation(email)}`).toPromise();
  }

  resetPassword(token: string, newPassword: NewPassword): Promise<any> {
    return this.http.post<any>(`${this.url}/${this.userEndpoint.getPasswordReset(token)}`, newPassword).toPromise();
  }

  sendPasswordReset(email: string): Promise<any> {
    return this.http.get<any>(`${this.url}/${this.userEndpoint.getSendPasswordReset(email)}`).toPromise();
  }

}
