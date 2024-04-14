import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly bookService = inject(BookService);

  protected books$!: Observable<Book[]>;

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks();
  }
}
