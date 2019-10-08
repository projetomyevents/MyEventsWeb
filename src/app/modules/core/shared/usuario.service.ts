import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = AppConfig.serverUrl;

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Promise<any> {
    return this.http.post(`${this.url}/login`, {email, senha}, {observe: 'response'}).toPromise();
  }

}
