import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { PageEvent } from '@angular/material/paginator';
import { BookReponse } from '../../../../core/models/book-reponse.model';
import { BookcaseService } from '../../services/bookcase/bookcase.service';

@Component({
  selector: 'app-bookcase',
  templateUrl: './bookcase.component.html',
  styleUrl: './bookcase.component.scss'
})
export class BookcaseComponent implements OnInit {

  private readonly bookcaseService = inject(BookcaseService);

  protected books$!: Observable<BookReponse[]>;

  pageSize = 5;
  pageIndex = 0;
  totalElements = 0;
  pageSizeOptions = [5, 10];

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // this.getBooks();
  }

  ngOnInit(): void {
    // this.books$ = this.bookService.getBooks();
  }

  onTabChange(tab: string) {
    console.log('Tab changed: ', tab);
  }
}
