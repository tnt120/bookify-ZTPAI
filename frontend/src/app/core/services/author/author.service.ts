import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private readonly apiUrl = `${environment.apiUrl}/author`;

  constructor(
    private http: HttpClient
  ) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }
}
