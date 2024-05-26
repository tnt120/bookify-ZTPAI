import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { commentRequest } from '../../models/comment-request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Comment } from '../../../modules/books/models/comment.model';
import { PageResponse } from '../../models/page-response';
import { SortOption } from '../../models/sort-option.model';
import { FiltersCommentModel } from '../../models/filters-comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = `${environment.apiUrl}/comments`;

  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSubject.asObservable();

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

  getSingleComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${commentId}`);
  }

  approveComment(commentId: number): Observable<number> {
    return this.http.patch<number>(`${this.apiUrl}/verify/${commentId}`, {});
  }

  getAllComments(page: number, size: number, sort: SortOption, filter: FiltersCommentModel): Observable<PageResponse<Comment>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort.sortBy)
      .set('order', sort.order)
      .set('verified', filter.verified);

    if (filter.title) params = params.set('title', filter.title);

    if (filter.user) params = params.set('user', filter.user);

    return this.http.get<PageResponse<Comment>>(`${this.apiUrl}/all`, { params }).pipe(
      tap(response => this.commentsSubject.next(response.content))
    );
  }
}
