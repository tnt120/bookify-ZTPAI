import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BookBookcaseResponse } from '../../models/book-bookcase-response.model';
import { BookReponse } from '../../../../core/models/book-reponse.model';
import { DetailsBookcaseAction, DetailsBookcaseResponse } from '../../models/details-bookcase-response.model';
import { BookcaseService } from '../../services/bookcase/bookcase.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBookcaseRequest } from '../../models/update-bookcase-request.model';
import { ProgressDialogData } from '../../models/progres-dialog-data.model';
import { BookcaseProgresDialogComponent } from '../bookcase-progres-dialog/bookcase-progres-dialog.component';
import { Subscription } from 'rxjs';
import { RatingService } from '../../../../core/services/rating/rating.service';

@Component({
  selector: 'app-bookcase-card',
  templateUrl: './bookcase-card.component.html',
  styleUrl: './bookcase-card.component.scss'
})
export class BookcaseCardComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  bookcaseResponse!: BookBookcaseResponse;

  @Input()
  type!: 'finished' | 'reading' | 'to-read';

  @Output()
  updateResolveEmitter = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private bookcaseService: BookcaseService,
    private ratingService: RatingService
  ) {}

  book!: BookReponse;

  cover!: string;

  progressPercentege = 0;

  detailsBookcaseType!: DetailsBookcaseResponse;

  detailsBookcaseAction!: DetailsBookcaseAction;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.book = this.bookcaseResponse.book;
    this.cover = this.bookCover;
    this.calcProgressPercentage();
    this.setBookcaseType();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setBookcaseType(): void {
    this.detailsBookcaseType = {
      id: this.bookcaseResponse.id,
      bookcaseId: this.bookcaseResponse.bookcaseType.id
    }

    this.detailsBookcaseAction = {...this.detailsBookcaseType, bookId: this.book.id};
  }

  calcProgressPercentage(): void {
    this.progressPercentege = (this.bookcaseResponse.currentPage / this.book.pages) * 100;
  }

  get bookCover(): string {
    return `data:image/jpeg;base64 ,${this.book.cover}`
  }

  onBookUpdate(newBookcaseId: number) {
    this.updateResolveEmitter.emit(newBookcaseId);
  }

  updateProgress() {
    const data: ProgressDialogData = {
      title: 'Update progress',
      message: 'Enter the current page',
      confirmText: 'Update',
      type: 'page',
      value: this.bookcaseResponse.currentPage
    };

    const dialogRef = this.dialog.open(BookcaseProgresDialogComponent, { data, width: '400px', height: '300px'});

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBookcase(this.detailsBookcaseAction.bookcaseId, result.currentPage);
      }
    }));
  }

  changeRating() {
    const data: ProgressDialogData = {
      title: 'Change rating',
      message: 'Enter new rating',
      confirmText: 'Update',
      type: 'rating',
      value: this.bookcaseResponse.book.ratings![0].value
    };

    const dialogRef = this.dialog.open(BookcaseProgresDialogComponent, { data, width: '400px', height: '300px'});

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRating(result.rating);
      }
    }));
  }

  private updateBookcase(bookcaseId: number, currentPage: number) {
    const request: UpdateBookcaseRequest = {
      bookId: this.detailsBookcaseAction.bookId,
      bookcaseId,
      currentPage
    };

    this.subscriptions.push(this.bookcaseService.updateUserBook(request).subscribe({
      next: res => {
        this.bookcaseResponse.currentPage = currentPage;
        this.calcProgressPercentage();
      },
      error: err => {
        console.error('Update bookcase error: ', err);
      }
    }));
  }

  private editRating(rating: number) {
    this.subscriptions.push(this.ratingService.editRating(this.bookcaseResponse.book.ratings![0].id, rating, this.bookcaseResponse.book.id).subscribe({
      next: res => {
        this.bookcaseResponse.book.ratings![0].value = rating;
      },
      error: err => {
        console.error('Edit rating error: ', err);
      }
    }));
  }
}
