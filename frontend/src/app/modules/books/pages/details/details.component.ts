import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../../core/services/book/book.service';
import { BookReponse } from '../../../../core/models/book-reponse.model';
import { Rating } from '../../models/rating.model';
import { DetailsBookcaseAction, DetailsBookcaseResponse } from '../../models/details-bookcase-response.model';
import { BookcaseService } from '../../services/bookcase/bookcase.service';
import { Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../core/store/reducers';
import { Roles } from '../../../../core/enums/roles.enum';
import { CommentsDialogComponent } from '../../components/comments-dialog/comments-dialog.component';
import { CommentsDialogData } from '../../models/comments-dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { ProgressDialogData } from '../../models/progres-dialog-data.model';
import { Comment } from '../../models/comment.model';
import { BookcaseProgresDialogComponent } from '../../components/bookcase-progres-dialog/bookcase-progres-dialog.component';
import { CommentService } from '../../../../core/services/comment/comment.service';
import { RatingService } from '../../../../core/services/rating/rating.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

  private readonly bookService = inject(BookService);
  private readonly bookcaseService = inject(BookcaseService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly commentService = inject(CommentService);
  private readonly ratingService = inject(RatingService);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  protected bookId: number = 0;

  protected book!: BookReponse;

  protected detailsBookcaseType: DetailsBookcaseResponse | null = null;

  protected detailsBookcaseAction: DetailsBookcaseAction | null = null;

  protected cover!: string;

  protected ratingsCount = Array(10).fill(0);

  protected userId = 0;

  protected hasComment = false;

  protected userComment: Comment | undefined = undefined;

  protected userRating: Rating | null = null;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = parseInt(id);
    }

    this.getBookcaseType();
    this.getBookDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getBookDetails() {
    this.bookService.getBook(this.bookId, this.userId).subscribe({
      next: book => {
        if (book) {
          this.book = book;
          this.cover = this.bookCover;

          this.checkUserComment();

          if (book.ratings) {
            this.ratingsCount = this.getRatingsCount(book.ratings);
          }
        }
      },
      error: error => {
        console.error(error);
        this.router.navigate(['']);
      }
    });
  }

  getBookcaseType() {
    this.subscriptions.push(this.store.select(selectUser).pipe(
      take(1)
    ).subscribe(user => {
      if (user.role !== Roles.unAuthorized) {
        this.userId = user.id;
        this.bookcaseService.getBookcaseType(this.bookId).subscribe({
          next: details => {
            this.detailsBookcaseType = details;
            this.detailsBookcaseAction = { ...details, bookId: this.bookId};

            if (details.rating) {
              this.userRating = details.rating;
            }
          },
          error: error => {
            console.error(error);
            this.router.navigate(['']);
          }
        })
      } else {
        this.detailsBookcaseType = null;
      }
    }));
  }

  getLimitedBook() {
    this.subscriptions.push(this.commentService.getLimitedBook(this.bookId, this.userId).subscribe({
      next: comments => {
        this.book.comments = comments;
        this.checkUserComment();
      },
      error: error => {
        console.error(error);
      }
    }));
  }

  getRating() {
    this.subscriptions.push(this.ratingService.getUserRating(this.userId, this.bookId).subscribe({
      next: rating => {
        this.userRating = rating;
      },
      error: error => {
        this.userRating = null;
        console.error(error);
      }
    }));
  }

  get bookCover(): string {
    return `data:image/jpeg;base64 ,${this.book.cover}`
  }

  getRatingsCount(ratings: Rating[]) {
    return ratings.reduce((counts, rating) => {
      counts[rating.value - 1]++;

      return counts;
    }, Array(10).fill(0));
  }

  showAllComments() {
    const data: CommentsDialogData = {
      bookId: this.book.id,
      userId: this.userId
    }

    this.dialog.open(CommentsDialogComponent, { data, width: "550px" });
  }

  updateBookcase(bookcaseId: number) {
    this.detailsBookcaseType!.bookcaseId = bookcaseId;
    this.getLimitedBook();
    this.getRating();
  }

  commentAction(type: 'modify' | 'add') {
    const data: ProgressDialogData = {
      title: type === 'add' ? 'Add comment' : 'Preview & modify comment',
      message: type === 'add' ? 'Enter your comment' : 'Your comment. You can simply modify it or delete',
      confirmText: type === 'add' ? 'Add' : 'Modify',
      type: 'comment',
      value: 0,
      comment: this.userComment?.content
    }

    const dialogRef = this.dialog.open(BookcaseProgresDialogComponent, { data, width: '400px', height: '600px'});

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (type === 'add') {
          this.addComment(result.comment);
        } else if (result.type === 'submit') {
          this.editComment(result.comment);
        } else {
          this.deleteComment();
        }
      }
    }))
  }

  changeRating() {
    const data: ProgressDialogData = {
      title: 'Change rating',
      message: 'Enter new rating',
      confirmText: 'Update',
      type: 'rating',
      value: this.userRating!.value
    };

    const dialogRef = this.dialog.open(BookcaseProgresDialogComponent, { data, width: '400px', height: '300px'});

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRating(result.rating);
      }
    }));
  }

  private editRating(rating: number) {
    this.feedbackService.editRating(this.userRating!.id, rating, this.book.id).then(res => {
      this.userRating!.value = rating;
    });
  }

  private checkUserComment() {
    if (this.userId > 0 && this.book.comments) {
      this.hasComment = this.book.comments.some(comment => comment.userId === this.userId);

      if (this.hasComment) {
        this.userComment = this.book.comments.find(comment => comment.userId === this.userId);
      }
    }
  }

  private addComment(comment: string) {
    this.feedbackService.addComment(comment, this.book.id).then(res => {
      if (res) {
        this.userComment = res;
        this.hasComment = true;
        this.getLimitedBook();
      }
    });
  }

  private editComment(comment: string) {
    this.feedbackService.editComment(comment, this.userComment!.id, this.book.id).then(res => {
      if (res) {
        this.userComment = res;
        this.hasComment = true;
        this.getLimitedBook();
      }
    });
  }

  private deleteComment() {
    this.feedbackService.deleteComment(this.userComment!.id).then(res => {
      if (res !== 0) {
        this.userComment = undefined;
        this.hasComment = false;
        this.getLimitedBook();
      }
    });
  }
}
