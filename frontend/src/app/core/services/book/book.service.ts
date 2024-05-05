import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookRequest } from '../../models/book-request.model';
import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { FiltersModel } from '../../../modules/books/models/filters.model';
import { SortOption } from '../../models/sort-option.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly apiUrl = `${environment.apiUrl}/book`;

  constructor(
    private http: HttpClient
  ) {}

  saveBook(request: BookRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, request);
  }

  uploadCover(bookId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/cover/${bookId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  getBooks(page: number, size: number, sort: SortOption, filters: FiltersModel): Observable<PageResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort.sortBy)
      .set('order', sort.order);

      if (filters.title) params = params.set('title', filters.title);

      if (filters.author) params = params.set('author', filters.author);

      if (filters.genre) params = params.set('genre', filters.genre);

      return this.http.get<PageResponse>(this.apiUrl, { params });
  }
}
