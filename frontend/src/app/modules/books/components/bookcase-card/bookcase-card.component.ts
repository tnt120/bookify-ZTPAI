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
    private bookcaseService: BookcaseService
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
      confirmText: 'Update'
    };

    const dialogRef = this.dialog.open(BookcaseProgresDialogComponent, { data });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBookcase(this.detailsBookcaseAction.bookcaseId, result.currentPage);
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
}
