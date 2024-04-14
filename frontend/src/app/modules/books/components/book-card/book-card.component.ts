import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({ required: true })
  book!: Book;

  avgRating = 0;

  ngOnInit(): void {
    this.avgRating = this.calculateRating();
  }

  calculateRating() {
    return this.book.ratings.length ? this.book.ratings.reduce((acc, item) => acc + item.value, 0) / this.book.ratings.length : 0;
  }
}
