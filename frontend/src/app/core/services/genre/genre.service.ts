import { Genre } from './../../models/genre.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SortOption } from '../../models/sort-option.model';
import { FiltersGenresModel } from '../../../modules/books/models/filters-genres-model.model';
import { GenreRequestUpdate } from '../../models/genre-request-update.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly apiUrl = `${environment.apiUrl}/genre`;

  private genresSubject = new BehaviorSubject<Genre[]>([]);
  genres$ = this.genresSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  getGenresManagement(sort: SortOption, filters: FiltersGenresModel): Observable<Genre[]> {
    let params = new HttpParams()
      .set('sort', sort.sortBy)
      .set('order', sort.order);

    if (filters.name) params = params.set('name', filters.name);

    return this.http.get<Genre[]>(this.apiUrl, { params }).pipe(
      tap(response => this.genresSubject.next(response))
    );
  }

  saveGenre(request: Genre): Observable<number> {
    return this.http.post<number>(this.apiUrl, request);
  }

  updateGenre(id: number, request: GenreRequestUpdate): Observable<number> {
    return this.http.patch<number>(`${this.apiUrl}/${id}`, request);
  }
}
