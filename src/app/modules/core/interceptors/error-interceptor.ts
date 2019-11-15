import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError as ObservableThrowError } from 'rxjs';
import { catchError as ObservableCatchError } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';


@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(ObservableCatchError(reason => {
      if (reason.status === 401) {
        // deslogar caso o usuário tente acessar uma rota bloqueada
        this.authenticationService.logout();
      }

      if (reason.error) {
        try {
          return ObservableThrowError(JSON.parse(reason.error));
        } catch (e) {
          return ObservableThrowError(reason.error);
        }
      }

      return ObservableThrowError(reason.statusText);
    }));
  }

}
