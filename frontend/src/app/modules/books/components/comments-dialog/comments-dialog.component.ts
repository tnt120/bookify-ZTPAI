import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsDialogData } from '../../models/comments-dialog-data.model';
import { Subscription } from 'rxjs';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { Comment } from '../../models/comment.model';
import { Pagination } from '../../../../core/models/pagination.model';
import { basePagination } from './../../../../core/constants/paginations-options';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.scss'
})
export class CommentsDialogComponent implements OnInit, OnDestroy {
  private readonly commentsService = inject(CommentService);

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: CommentsDialogData,
  ) { }

  comments: Comment[] = [];

  subscriptions: Subscription[] = []

  pagination: Pagination = {...basePagination};

  handlePageEvent(e: PageEvent) {
    this.pagination.pageEvent = e;
    this.pagination.pageSize = e.pageSize;
    this.pagination.pageIndex = e.pageIndex;
    this.getComments();
  }

  ngOnInit(): void {
    this.pagination.pageSizeOptions = [3, 5];
    this.pagination.pageSize = 5;
    this.getComments();
  }

  getComments() {
    this.subscriptions.push(this.commentsService.getCommentsByBook(this.data.bookId, this.pagination.pageIndex, this.pagination.pageSize).subscribe({
      next: response => {
        this.comments = response.content;
        this.pagination.totalElements = response.totalElements;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
