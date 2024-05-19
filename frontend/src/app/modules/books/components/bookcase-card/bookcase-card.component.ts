import { Component, Input, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookReponse } from '../../../../core/models/book-reponse.model';

@Component({
  selector: 'app-bookcase-card',
  templateUrl: './bookcase-card.component.html',
  styleUrl: './bookcase-card.component.scss'
})
export class BookcaseCardComponent {
  @Input({ required: true })
  book!: BookReponse;

  @Input()
  type!: 'finished' | 'reading' | 'to-read';

  ngOnInit(): void {

  }
}
