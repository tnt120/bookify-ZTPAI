import { Component, OnInit, inject } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../core/services/book/book.service';
import { BookReponse } from '../../../../core/models/book-reponse.model';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly bookService = inject(BookService);

  private readonly route = inject(ActivatedRoute);

  protected bookId: number = 0;

  protected book!: BookReponse;

  protected cover!: string;

  protected ratingsCount = Array(10).fill(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = parseInt(id);
    }

    this.bookService.getBook(this.bookId).subscribe(book => {
      if (book) {
        this.book = book;
        this.cover = this.bookCover;

        if (book.ratings) {
          this.ratingsCount = this.getRatingsCount(book.ratings);
        }
      }
    })
  }

  get bookCover(): string {
    return `data:image/jpeg;base64 ,${this.book.cover}`
  }

  getRatingsCount(ratings: Rating[]) {
    return ratings.reduce((counts, rating) => {
      counts[rating.value - 1]++;

      return counts;
    }, Array(10).fill(0));
  }
}
