import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Author } from '../../models/author.model';
import { SortOption } from '../../models/sort-option.model';
import { FiltersAuthorsModel } from '../../../modules/books/models/filters-authors.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private readonly apiUrl = `${environment.apiUrl}/author`;

  private authorsSubject = new BehaviorSubject<Author[]>([]);
  authors$ = this.authorsSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthorsManagement(sort: SortOption, filters: FiltersAuthorsModel): Observable<Author[]> {
    let params = new HttpParams()
      .set('sort', sort.sortBy)
      .set('order', sort.order);

    if (filters.firstName) params = params.set('firstName', filters.firstName);

    if (filters.lastName) params = params.set('lastName', filters.lastName);

    return this.http.get<Author[]>(this.apiUrl, { params }).pipe(
      tap(response => this.authorsSubject.next(response))
    );
  }

  saveAuthor(request: Author): Observable<number> {
    return this.http.post<number>(this.apiUrl, request);
  }
}
