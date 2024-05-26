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

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {

  private readonly bookService = inject(BookService);
  private readonly bookcaseService = inject(BookcaseService);
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

          if (this.userId > 0 && book.comments) {
            this.hasComment = book.comments.some(comment => comment.userId === this.userId);
          }

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
  }

  onAddComment() {
    console.log('Add comment');
  }

  onEditComment() {
    console.log('Edit comment');
  }

  onDeleteComment() {
    console.log('Delete comment');
  }
}
