import { Component, Input } from '@angular/core';
import { DetailsBookcaseResponse } from '../../models/details-bookcase-response.model';
import { Book } from '../../models/book.model';
import { BookcaseType } from '../../../../core/enums/bookcase-type.enum';

@Component({
  selector: 'app-bookcase-actions',
  templateUrl: './bookcase-actions.component.html',
  styleUrl: './bookcase-actions.component.scss'
})
export class BookcaseActionsComponent {
  @Input({ required: true })
  detailsBookcaseType!: DetailsBookcaseResponse;

  @Input()
  isCard = false;

  bookcaseType = {
    FINISHED: BookcaseType.FINISHED,
    READING: BookcaseType.READING,
    TO_READ: BookcaseType.TO_READ
  };
}
