import { basePagination } from './../../../../core/constants/paginations-options';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { CustomSnackbarService } from '../../../../core/services/custom-snackbar/custom-snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Comment } from '../../../books/models/comment.model';
import { HeaderItem } from '../../../../core/models/header-item.model';
import { dashboardTabHeaders } from '../../../../core/constants/headers';
import { FiltersCommentModel } from '../../../../core/models/filters-comment-model';
import { Pagination } from '../../../../core/models/pagination.model';
import { SortOption } from '../../../../core/models/sort-option.model';
import { baseSortCommentsOptions } from '../../../../core/constants/sort-options';
import { PageEvent } from '@angular/material/paginator';
import { PageResponse } from '../../../../core/models/page-response';
import { ConfirimationDialogData } from '../../../../core/models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.scss', '../../styles/manages.style.scss']
})
export class ManageCommentsComponent implements OnInit, OnDestroy {
  private readonly commentService = inject(CommentService);
  private readonly customSnackbarService = inject(CustomSnackbarService);

  constructor(
    public dialog: MatDialog
  ) {}

  protected comments$: Observable<Comment[]> = this.commentService.comments$;

  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['id', 'userId', 'content', 'verified'];

  navItems: HeaderItem[] = dashboardTabHeaders;

  filtersValue: FiltersCommentModel = {
    title: null,
    user: null,
    verified: true
  }

  pagination: Pagination = {...basePagination};

  sortOptions: SortOption[] = baseSortCommentsOptions;

  sort: SortOption = this.sortOptions[0];

  handlePageEvent(e: PageEvent) {
    this.pagination.pageEvent = e;
    this.pagination.pageSize = e.pageSize;
    this.pagination.pageIndex = e.pageIndex;
    this.getComments();
  }

  onSearch(filter: FiltersCommentModel) {
    this.filtersValue = filter;
    this.pagination.pageIndex = 0;
    this.getComments();
  }

  onSort(sort: SortOption) {
    this.sort = sort;
    this.pagination.pageIndex = 0;
    this.getComments();
  }

  ngOnInit(): void {
    this.getComments();

    if (window.innerWidth < 768) {
      this.displayedColumns = ['id', 'userId', 'content'];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getComments() {
    this.subscriptions.push(this.commentService.getAllComments(this.pagination.pageIndex, this.pagination.pageSize, this.sort, this.filtersValue).subscribe({
      next: (response: PageResponse<Comment>) => {
        this.pagination.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    }));
  }

  onVerify(comment: Comment) {
    this.confirmationDialog(comment, false);
  }

  onDelete(comment: Comment) {
    this.confirmationDialog(comment, true);
  }

  confirmationDialog(comment: Comment, isDelete: boolean) {
    const data: ConfirimationDialogData = {
      title: isDelete ? 'Delete comment' : 'Approve comment',
      message: isDelete ? 'Are you sure you want to delete this comment?' : 'Are you sure you want to approve this comment?',
      confirmText: isDelete ? 'Delete' : 'Approve'
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isDelete) {
          this.deleteComment(comment);
        } else {
          this.approveComment(comment);
        }
      }
    }));
  }

  private deleteComment(comment: Comment) {
    this.subscriptions.push(this.commentService.deleteComment(comment.id).subscribe({
      next: res => {
        this.getComments();
        this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment has been deleted successfully', type: 'success', duration: 2500});
      },
      error: err => {
        console.error('Delete comment error: ', err);
        this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'An error occurred while deleting the comment', type: 'error', duration: 2500});
      }
    }));
  }

  approveComment(comment: Comment): void {
    this.subscriptions.push(this.commentService.approveComment(comment.id).subscribe({
      next: res => {
        this.getComments();
        this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment has been approved successfully', type: 'success', duration: 2500 });
      },
      error: err => {
        console.error(err);
        this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'An error occurred while approving the comment', type: 'error', duration: 2500 });
      }
    }));
  }
}
