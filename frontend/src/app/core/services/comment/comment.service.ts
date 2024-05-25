import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { commentRequest } from '../../models/comment-request.model';
import { Observable } from 'rxjs';
import { Comment } from '../../../modules/books/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = `${environment.apiUrl}/comments`;

  constructor(
    private http: HttpClient
  ) { }

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
