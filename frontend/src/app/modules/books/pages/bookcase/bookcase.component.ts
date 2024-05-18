import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-bookcase',
  templateUrl: './bookcase.component.html',
  styleUrl: './bookcase.component.scss'
})
export class BookcaseComponent implements OnInit {

  private readonly bookService = inject(BookService);

  protected books$!: Observable<Book[]>;

  ngOnInit(): void {
    // this.books$ = this.bookService.getBooks();
  }
}
