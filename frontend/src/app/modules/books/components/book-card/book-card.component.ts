import { Component, Input, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({ required: true })
  book!: Book;

  avgRating = 0;

  private readonly bookService = inject(BookService);

  ngOnInit(): void {
    this.avgRating = this.bookService.calculateRating(this.book);
  }
}