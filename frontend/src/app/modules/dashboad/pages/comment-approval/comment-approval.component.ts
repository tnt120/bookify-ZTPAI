import { ConfirimationDialogData } from './../../../../core/models/confirmation-dialog-data.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { Comment } from '../../../books/models/comment.model';
import { CustomSnackbarService } from '../../../../core/services/custom-snackbar/custom-snackbar.service';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-approval',
  templateUrl: './comment-approval.component.html',
  styleUrl: './comment-approval.component.scss'
})
export class CommentApprovalComponent implements OnInit, OnDestroy {

  protected commentId!: number

  protected comment: Comment | null = null;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private customSnackbarService: CustomSnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.commentId = parseInt(id);
    } else {
      this.router.navigate(['/dashboard']);
    }

    this.getComment();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getComment(): void {
    this.subscriptions.push(this.commentService.getSingleComment(this.commentId).subscribe({
      next: comment => {
        this.comment = comment;
      },
      error: err => {
        console.error(err);
      }
    }))
  }

  openConfirmationDialog(isDelete: boolean): void {
    const data: ConfirimationDialogData = {
      title: isDelete ? 'Delete comment' : 'Approve comment',
      message: isDelete ? 'Are you sure you want to delete this comment?' : 'Are you sure you want to approve this comment?',
      confirmText: isDelete ? 'Delete' : 'Approve'
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isDelete) {
          this.deleteComment();
        } else {
          this.approveComment();
        }
      }
    }));
  }

  approveComment(): void {
    this.subscriptions.push(this.commentService.approveComment(this.commentId).subscribe({
      next: res => {
        this.router.navigate(['/dashboard/comments']);
        this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment has been approved successfully', type: 'success', duration: 2500 });
      },
      error: err => {
        console.error(err);
        this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'An error occurred while approving the comment', type: 'error', duration: 2500 });
      }
    }));
  }

  deleteComment(): void {
    this.subscriptions.push(this.commentService.deleteComment(this.commentId).subscribe({
      next: res => {
        this.router.navigate(['/dashboard/comments']);
        this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment has been deleted successfully', type: 'success', duration: 2500 });
      },
      error: err => {
        console.error(err);
        this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'An error occurred while deleting the comment', type: 'error', duration: 2500 });
      }
    }));
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard/comments']);
  }
}
