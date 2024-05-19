import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BookBookcaseResponse } from '../../models/book-bookcase-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageResponse } from '../../../../core/models/page-response';
import { BookcaseType } from '../../../../core/enums/bookcase-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BookcaseService {

  private readonly apiUrl = `${environment.apiUrl}/userBook`;

  private finishedBooksSubject = new BehaviorSubject<BookBookcaseResponse[]>([]);
  finishedBooks$ = this.finishedBooksSubject.asObservable();

  private readingBooksSubject = new BehaviorSubject<BookBookcaseResponse[]>([]);
  readingBooks$ = this.readingBooksSubject.asObservable();

  private toReadBooksSubject = new BehaviorSubject<BookBookcaseResponse[]>([]);
  toReadBooks$ = this.toReadBooksSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getUserBooks(bookcaseId: number, page: number, size: number): Observable<PageResponse<BookBookcaseResponse>> {
    let params = new HttpParams()
      .set('bookcaseId', bookcaseId)
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<BookBookcaseResponse>>(this.apiUrl, { params }).pipe(
      tap(response => {
        switch (bookcaseId) {
          case BookcaseType.FINISHED:
            this.finishedBooksSubject.next(response.content);
            break;
          case BookcaseType.READING:
            this.readingBooksSubject.next(response.content);
            break;
          case BookcaseType.TO_READ:
            this.toReadBooksSubject.next(response.content);
            break;
        }
      })
    );
  }

}
