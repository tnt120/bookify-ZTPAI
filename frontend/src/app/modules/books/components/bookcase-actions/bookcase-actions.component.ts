import { BookcaseService } from './../../services/bookcase/bookcase.service';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DetailsBookcaseAction } from '../../models/details-bookcase-response.model';
import { BookcaseType } from '../../../../core/enums/bookcase-type.enum';
import { ConfirimationDialogData } from '../../../../core/models/confirmation-dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { UpdateBookcaseRequest } from '../../models/update-bookcase-request.model';
import { ProgressDialogData } from '../../models/progres-dialog-data.model';
import { BookcaseProgresDialogComponent } from '../bookcase-progres-dialog/bookcase-progres-dialog.component';

@Component({
  selector: 'app-bookcase-actions',
  templateUrl: './bookcase-actions.component.html',
  styleUrl: './bookcase-actions.component.scss'
})
export class BookcaseActionsComponent implements OnDestroy {
  @Input({ required: true })
  detailsBookcaseAction!: DetailsBookcaseAction;

  @Input()
  isCard = false;

  @Output()
  updateResolveEmitter = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private bookcaseService: BookcaseService
  ) {}

  bookcaseType = {
    FINISHED: BookcaseType.FINISHED,
    READING: BookcaseType.READING,
    TO_READ: BookcaseType.TO_READ
  };

  bookcaseNames: { [key: number]: string } = {
    [BookcaseType.FINISHED]: 'Finished',
    [BookcaseType.READING]: 'Reading',
    [BookcaseType.TO_READ]: 'To read',
  };

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onActionClick(bookcaseId: number) {
    const data: ConfirimationDialogData = {
      title: this.detailsBookcaseAction.id ? 'Change bookcase' : 'Add to bookcase',
      message: this.detailsBookcaseAction.id ? `Moving from "${this.bookcaseNames[this.detailsBookcaseAction.bookcaseId]}" to "${this.bookcaseNames[bookcaseId]}" bookcase.` : `Add to "${this.bookcaseNames[bookcaseId]}"`,
      confirmText: 'Ok'
    };

    switch (bookcaseId) {
      case BookcaseType.FINISHED:
        break;
      case BookcaseType.READING:
        this.progressDialog(data);
        break;
      case BookcaseType.TO_READ:
      case 0:
        this.confirmationDialog(bookcaseId, data);
        break;
    }
  }

  confirmationDialog(bookcaseId: number, data: ConfirimationDialogData) {
    if (bookcaseId === 0) {
      data.title = 'Delete from bookcase';
      data.message = 'Are you sure to delete this book from your bookcase?';
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (bookcaseId) {
          case BookcaseType.TO_READ:
            this.updateBookcase(bookcaseId, 0);
            break;
          case 0:
            this.deleteBook();
            break;
        }
      }
    }));
  }

  progressDialog(context: ConfirimationDialogData) {
    const data: ProgressDialogData = {...context, additionalMessage: 'Set your current page', type: 'page', value: 0};

    const dialogRef = this.dialog.open(BookcaseProgresDialogComponent, { data, width: '400px', height: '300px'});

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBookcase(BookcaseType.READING, result.currentPage);
      }
    }))
  }

  private updateBookcase(bookcaseId: number, currentPage: number) {
    const request: UpdateBookcaseRequest = {
      bookId: this.detailsBookcaseAction.bookId,
      bookcaseId,
      currentPage
    };

    this.subscriptions.push(this.bookcaseService.updateUserBook(request).subscribe({
      next: res => {
        this.detailsBookcaseAction.bookcaseId = bookcaseId;
        this.detailsBookcaseAction.id = res;
        this.updateResolveEmitter.emit(bookcaseId);
      },
      error: err => {
        console.error('Update bookcase error: ', err);
      }
    }));
  }

  private deleteBook() {
    this.subscriptions.push(this.bookcaseService.deleteUserBook(this.detailsBookcaseAction.id).subscribe({
      next: () => {
        this.detailsBookcaseAction.id = 0;
        this.detailsBookcaseAction.bookcaseId = 0;
        this.updateResolveEmitter.emit(0);
      },
      error: err => {
        console.error('Delete bookcase error: ', err);
      }
    }));
  }
}
