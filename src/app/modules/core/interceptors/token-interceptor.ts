import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authenticationService.userValue;

    // se o usuário estiver autenticado adicionar o token de autorização no cabeçalho da requisição
    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          Authorization: user.token
        }
      });
    }

    return next.handle(request);
  }

}
