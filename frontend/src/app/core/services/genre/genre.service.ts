import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly apiUrl = `${environment.apiUrl}/genre`;

  constructor(
    private http: HttpClient
  ) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }
}
