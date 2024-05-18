import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  calculateRating(book: Book) {
    return parseFloat((book.ratings.length ? book.ratings.reduce((acc, item) => acc + item.value, 0) / book.ratings.length : 0).toFixed(1));
  }
}
