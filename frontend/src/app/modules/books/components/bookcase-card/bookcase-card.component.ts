import { Component, Input, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-bookcase-card',
  templateUrl: './bookcase-card.component.html',
  styleUrl: './bookcase-card.component.scss'
})
export class BookcaseCardComponent {
  @Input({ required: true })
  book!: Book;

  @Input()
  type!: 'finished' | 'reading' | 'to-read';

  avgRating = 0;

  private readonly bookService = inject(BookService);

  ngOnInit(): void {
    this.avgRating = this.bookService.calculateRating(this.book);
  }
}
