import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RatingRequest } from '../../models/rating.request.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private readonly apiUrl = `${environment.apiUrl}/ratings`;

  constructor(
    private http: HttpClient
  ) { }

  editRating(id: number, rating: number, bookId: number): Observable<number> {
    const request: RatingRequest = {
      bookId,
      value: rating
    };

    return this.http.patch<number>(`${this.apiUrl}/${id}`, request);
  }
}
