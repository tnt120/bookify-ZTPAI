import { Injectable, inject } from '@angular/core';
import { RatingService } from '../../../../core/services/rating/rating.service';
import { firstValueFrom } from 'rxjs';
import { CustomSnackbarService } from '../../../../core/services/custom-snackbar/custom-snackbar.service';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { commentRequest } from '../../../../core/models/comment-request.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly ratingService = inject(RatingService);
  private readonly commentService = inject(CommentService);
  private readonly customSnackbarService = inject(CustomSnackbarService);

  async editRating(ratingId: number, rating: number, bookId: number): Promise<number> {
    try {
      await firstValueFrom(this.ratingService.editRating(ratingId, rating, bookId));
      this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Rating updated', type: 'success', duration: 2500});
      return rating;
    } catch (err) {
      console.error('Edit rating error: ', err);
      this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while updating rating', type: 'error', duration: 2500});
      return 0;
    }
  }

  async addComment(comment: string, bookId: number): Promise<Comment | null> {
    try {
      const request: commentRequest = {
        bookId: bookId,
        content: comment
      };

      const res = firstValueFrom(this.commentService.addComment(request));
      this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment added', type: 'success', duration: 2500})
      return res;
    } catch (err) {
      console.error('Add comment error: ', err);
      this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while adding comment', type: 'error', duration: 2500})
      return null;
    }
  }

  async editComment(comment: string, commentId: number, bookId: number): Promise<Comment | null> {
    try {
      const request: commentRequest = {
        bookId: bookId,
        content: comment
      };

      const res = firstValueFrom(this.commentService.updateComment(commentId, request));
      this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment updated', type: 'success', duration: 2500})
      return res;
    } catch (err) {
      console.error('Edit comment error: ', err);
      this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while updating comment', type: 'error', duration: 2500})
      return null;
    }
  }

  async deleteComment(commentId: number): Promise<number> {
    try {
      await firstValueFrom(this.commentService.deleteComment(commentId));
      this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Comment deleted', type: 'success', duration: 2500})
      return commentId;
    } catch (err) {
      console.error('Delete comment error: ', err);
      this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while deleting comment', type: 'error', duration: 2500})
      return 0;
    }
  }
}
