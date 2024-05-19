import { Component, Input } from '@angular/core';
import { BookBookcaseResponse } from '../../models/book-bookcase-response.model';
import { BookReponse } from '../../../../core/models/book-reponse.model';

@Component({
  selector: 'app-bookcase-card',
  templateUrl: './bookcase-card.component.html',
  styleUrl: './bookcase-card.component.scss'
})
export class BookcaseCardComponent {
  @Input({ required: true })
  bookcaseResponse!: BookBookcaseResponse;

  @Input()
  type!: 'finished' | 'reading' | 'to-read';

  book!: BookReponse;

  cover!: string;

  progressPercentege = 0;

  ngOnInit(): void {
    this.book = this.bookcaseResponse.book;
    this.cover = this.bookCover;
    this.calcProgressPercentage();
  }

  calcProgressPercentage(): void {
    this.progressPercentege = (this.bookcaseResponse.currentPage / this.book.pages) * 100;
  }

  get bookCover(): string {
    return `data:image/jpeg;base64 ,${this.book.cover}`
  }
}
