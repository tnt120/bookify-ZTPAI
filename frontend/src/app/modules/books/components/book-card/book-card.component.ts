import { Component, Input } from '@angular/core';
import { BookReponse } from '../../../../core/models/book-reponse.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({ required: true })
  book!: BookReponse;

  get bookCover(): string {
    return `data:image/jpeg;base64 ,${this.book.cover}`
  }
}
