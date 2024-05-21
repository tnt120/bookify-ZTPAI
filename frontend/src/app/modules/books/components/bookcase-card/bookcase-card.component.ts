import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookBookcaseResponse } from '../../models/book-bookcase-response.model';
import { BookReponse } from '../../../../core/models/book-reponse.model';
import { DetailsBookcaseAction, DetailsBookcaseResponse } from '../../models/details-bookcase-response.model';

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

  @Output()
  updateResolveEmitter = new EventEmitter<number>();

  book!: BookReponse;

  cover!: string;

  progressPercentege = 0;

  detailsBookcaseType!: DetailsBookcaseResponse;

  detailsBookcaseAction!: DetailsBookcaseAction;

  ngOnInit(): void {
    this.book = this.bookcaseResponse.book;
    this.cover = this.bookCover;
    this.calcProgressPercentage();
    this.setBookcaseType();
  }

  setBookcaseType(): void {
    this.detailsBookcaseType = {
      id: this.bookcaseResponse.id,
      bookcaseId: this.bookcaseResponse.bookcaseType.id
    }

    this.detailsBookcaseAction = {...this.detailsBookcaseType, bookId: this.book.id};
  }

  calcProgressPercentage(): void {
    this.progressPercentege = (this.bookcaseResponse.currentPage / this.book.pages) * 100;
  }

  get bookCover(): string {
    return `data:image/jpeg;base64 ,${this.book.cover}`
  }

  onBookUpdate(newBookcaseId: number) {
    this.updateResolveEmitter.emit(newBookcaseId);
  }
}
