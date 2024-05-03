import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BookRequest } from '../../models/book-request.model';
import { Observable } from 'rxjs';

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
}
