import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookRequest, BookRequestUpdate } from '../../models/book-request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PageResponse } from '../../models/page-response';
import { FiltersBookModel } from '../../../modules/books/models/filters-books.model';
import { SortOption } from '../../models/sort-option.model';
import { BookReponse } from '../../models/book-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly apiUrl = `${environment.apiUrl}/book`;

  private booksSubject = new BehaviorSubject<BookReponse[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  saveBook(request: BookRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, request);
  }

  deleteBook(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }

  updateBook( id: number, request: BookRequestUpdate): Observable<number> {
    return this.http.patch<number>(`${this.apiUrl}/${id}`, request);
  }

  uploadCover(bookId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/cover/${bookId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  getBooks(page: number, size: number, sort: SortOption, filters: FiltersBookModel): Observable<PageResponse<BookReponse>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort.sortBy)
      .set('order', sort.order);

      if (filters.title) params = params.set('title', filters.title);

      if (filters.author) params = params.set('author', filters.author);

      if (filters.genre) params = params.set('genre', filters.genre);

      return this.http.get<PageResponse<BookReponse>>(this.apiUrl, { params }).pipe(
        tap(response => this.booksSubject.next(response.content))
      );
  }

  getBook(bookId: number, userId: number): Observable<BookReponse> {
    let params = new HttpParams()
      .set('userId', userId);

    return this.http.get<BookReponse>(`${this.apiUrl}/${bookId}`, { params });
  }
}
