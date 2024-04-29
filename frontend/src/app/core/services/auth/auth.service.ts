import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../models/register-request.model';
import { AuthenticationRequest } from '../../models/authentication-request-model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: AuthenticationRequest): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: RegisterRequest): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/register`, credentials);
  }

  verify(): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/verify`, {});
  }

}
