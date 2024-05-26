import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { commentRequest } from '../../models/comment-request.model';
import { Observable } from 'rxjs';
import { Comment } from '../../../modules/books/models/comment.model';
import { PageResponse } from '../../models/page-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = `${environment.apiUrl}/comments`;

  constructor(
    private http: HttpClient
  ) { }

  getCommentsByBook(bookId: number, page: number, size: number): Observable<PageResponse<Comment>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)

    return this.http.get<PageResponse<Comment>>(`${this.apiUrl}/allByBook/${bookId}`, { params });
  }

  addComment(request: commentRequest): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, request);
  }

  updateComment(commentId: number, request: commentRequest): Observable<Comment> {
    return this.http.patch<Comment>(`${this.apiUrl}/${commentId}`, request);
  }

  deleteComment(commentId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${commentId}`);
  }
}
