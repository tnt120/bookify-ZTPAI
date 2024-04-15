import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly bookService = inject(BookService);

  private readonly route = inject(ActivatedRoute);

  protected id!: string | null;

  protected book!: Book;

  protected coverUrl!: string;

  protected avgRating = 0;

  protected ratingsAmount = 0;

  protected commentsAmount = 0;

  protected ratingsCount = Array(10).fill(0);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    })

    this.bookService.getBook(this.id).subscribe(book => {
      if (book) {
        this.book = book;
        this.coverUrl = `url('/assets/images/covers/${book.imageUrl}')`;
        this.avgRating = this.bookService.calculateRating(book);
        this.ratingsAmount = book?.ratings?.length ? book.ratings.length : 0;
        this.commentsAmount = book?.comments?.length ? book.comments.length : 0;

        this.ratingsCount = book.ratings.reduce((counts, rating) => {
            if (rating.value >= 1 && rating.value <= 10) {
              counts[rating.value - 1]++;
            }
            return counts;
          }, Array(10).fill(0));
        
        console.log(this.ratingsCount);
      }
    });
  }
}
