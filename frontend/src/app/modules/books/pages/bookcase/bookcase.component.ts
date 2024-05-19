import { bookcasePagination } from './../../../../core/constants/paginations-options';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BookcaseService } from '../../services/bookcase/bookcase.service';
import { BookBookcaseResponse } from '../../models/book-bookcase-response.model';
import { BookcaseType } from '../../../../core/enums/bookcase-type.enum';
import { Pagination } from '../../../../core/models/pagination.model';

@Component({
  selector: 'app-bookcase',
  templateUrl: './bookcase.component.html',
  styleUrl: './bookcase.component.scss'
})
export class BookcaseComponent implements OnInit, OnDestroy {

  private readonly bookcaseService = inject(BookcaseService);

  protected finishedBooks$: Observable<BookBookcaseResponse[]> = this.bookcaseService.finishedBooks$;
  protected readingBooks$: Observable<BookBookcaseResponse[]> = this.bookcaseService.readingBooks$;
  protected toReadBooks$: Observable<BookBookcaseResponse[]> = this.bookcaseService.toReadBooks$;

  subscriptions: Subscription[] = [];

  finished = BookcaseType.FINISHED;
  reading = BookcaseType.READING;
  toRead = BookcaseType.TO_READ;

  protected paginations: { [key: number]: Pagination } = {
    [BookcaseType.FINISHED]: {...bookcasePagination},
    [BookcaseType.READING]: {...bookcasePagination},
    [BookcaseType.TO_READ]: {...bookcasePagination}
  }

  pageEvent: PageEvent | undefined;

  currentBookcase: number = BookcaseType.FINISHED;

  handlePageEvent(e: PageEvent, bookcaseId: number) {
    this.paginations[bookcaseId].pageEvent = e;
    this.paginations[bookcaseId].pageSize = e.pageSize;
    this.paginations[bookcaseId].pageIndex = e.pageIndex;

    this.getBooks(bookcaseId);
  }

  ngOnInit(): void {
    this.getBooks(BookcaseType.FINISHED);
    this.getBooks(BookcaseType.READING);
    this.getBooks(BookcaseType.TO_READ);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getBooks(bookcaseId: number) {
    const pagination = this.paginations[bookcaseId];

    this.subscriptions.push(this.bookcaseService.getUserBooks(bookcaseId, pagination.pageIndex, pagination.pageSize).subscribe({
      next: response => {
        this.paginations[bookcaseId].totalElements = response.totalElements;
      },
      error: error => {
        console.error(error);
      }
    }));
  }

  onTabChange(tab: string) {
    switch (tab) {
      case 'finished':
        this.currentBookcase = BookcaseType.FINISHED;
        break;
      case 'reading':
        this.currentBookcase = BookcaseType.READING;
        break;
      case 'to-read':
        this.currentBookcase = BookcaseType.TO_READ;
        break;
    }
  }
}
