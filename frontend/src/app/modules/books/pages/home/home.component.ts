import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BookService } from '../../../../core/services/book/book.service';
import { PageResponse } from '../../../../core/models/page-response';
import { GenreService } from '../../../../core/services/genre/genre.service';
import { Genre } from '../../../../core/models/genre.model';
import { Author } from '../../../../core/models/author.model';
import { AuthorService } from '../../../../core/services/author/author.service';
import { FiltersModel } from '../../models/filters.model';
import { SortOption } from '../../../../core/models/sort-option.model';

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

  bookResponse: PageResponse | undefined;

  genres$: Observable<Genre[]> = this.genreService.getGenres();
  authors$: Observable<Author[]> = this.authorService.getAuthors();

  filtersValue: FiltersModel = {
    title: null,
    author: null,
    genre: null,
  }

  pageSize = 10;
  pageIndex = 0;
  totalElemets = 50;
  pageSizeOptions = [5, 10, 25, 50];

  sortOptions: SortOption[] = [
    {
      sortBy: 'title',
      order: 'asc',
    },
    {
      sortBy: 'title',
      order: 'desc',
    },
    {
      sortBy: 'releaseDate',
      order: 'asc',
    },
    {
      sortBy: 'releaseDate',
      order: 'desc',
    },
  ];

  sort: SortOption = this.sortOptions[0];

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getBooks();
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }

  getBooks() {
    this.subscribtions.push(this.bookService.getBooks(this.pageIndex, this.pageSize, this.sort, this.filtersValue).subscribe({
      next: response => {
        this.bookResponse = response;
        this.totalElemets = response.totalElements;
      },
      error: err => {
        console.error(err);
      }
    }));
  }

  onSearch(filter: FiltersModel) {
    this.filtersValue = filter;
    this.pageIndex = 0;
    this.getBooks();
  }

  onSort(sort: SortOption) {
    this.sort = sort;
    this.getBooks();
  }
}
