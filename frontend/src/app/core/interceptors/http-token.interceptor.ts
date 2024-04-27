import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.tokenService.token;

    if (jwtToken) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${jwtToken}`
        })
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
