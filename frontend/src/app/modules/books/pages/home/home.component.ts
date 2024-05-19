import { basePagination } from './../../../../core/constants/paginations-options';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BookService } from '../../../../core/services/book/book.service';
import { PageResponse } from '../../../../core/models/page-response';
import { GenreService } from '../../../../core/services/genre/genre.service';
import { Genre } from '../../../../core/models/genre.model';
import { Author } from '../../../../core/models/author.model';
import { AuthorService } from '../../../../core/services/author/author.service';
import { FiltersBookModel } from '../../models/filters-books.model';
import { SortOption } from '../../../../core/models/sort-option.model';
import { baseSortOptions } from '../../../../core/constants/sort-options';
import { BookReponse } from '../../../../core/models/book-reponse.model';
import { Pagination } from '../../../../core/models/pagination.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly bookService = inject(BookService);
  private readonly genreService = inject(GenreService);
  private readonly authorService = inject(AuthorService);

  subscribtions: Subscription[] = [];

  protected books$: Observable<BookReponse[]> = this.bookService.books$;

  genres$: Observable<Genre[]> = this.genreService.getGenres();
  authors$: Observable<Author[]> = this.authorService.getAuthors();

  filtersValue: FiltersBookModel = {
    title: null,
    author: null,
    genre: null,
  }

  pagination: Pagination = {...basePagination};

  sortOptions: SortOption[] = baseSortOptions;

  sort: SortOption = this.sortOptions[0];

  handlePageEvent(e: PageEvent) {
    this.pagination.pageEvent = e;
    this.pagination.pageSize = e.pageSize;
    this.pagination.pageIndex = e.pageIndex;
    this.getBooks();
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }

  getBooks() {
    this.subscribtions.push(this.bookService.getBooks(this.pagination.pageIndex, this.pagination.pageSize, this.sort, this.filtersValue).subscribe({
      next: (response: PageResponse<BookReponse>) => {
        this.pagination.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    }));
  }

  onSearch(filter: FiltersBookModel) {
    this.filtersValue = filter;
    this.pagination.pageIndex = 0;
    this.getBooks();
  }

  onSort(sort: SortOption) {
    this.sort = sort;
    this.pagination.pageIndex = 0;
    this.getBooks();
  }
}
