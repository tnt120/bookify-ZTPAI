import { PageResponse } from './../../../../core/models/page-response';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '../../../books/models/book.model';
import { HeaderItem } from '../../../../core/models/header-item.model';
import { BookService } from '../../../../core/services/book/book.service';
import { SortOption } from '../../../../core/models/sort-option.model';
import { PageEvent } from '@angular/material/paginator';
import { FiltersModel } from '../../../books/models/filters.model';
import { Author } from '../../../../core/models/author.model';
import { Genre } from '../../../../core/models/genre.model';
import { GenreService } from '../../../../core/services/genre/genre.service';
import { AuthorService } from '../../../../core/services/author/author.service';
import { baseSortOptions } from '../../../../core/constants/sort-options';
import { dashboardTabHeaders } from '../../../../core/constants/headers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.scss'
})
export class ManageBooksComponent {
  private readonly bookService = inject(BookService);
  private readonly genreService = inject(GenreService);
  private readonly authorService = inject(AuthorService);
  private readonly router = inject(Router);

  protected bookResponse$!: Observable<PageResponse>;

  displayedColumns: string[] = ['title', 'author', 'genre', 'pages', 'releaseDate'];

  navItems: HeaderItem[] = dashboardTabHeaders;

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

  sortOptions: SortOption[] = baseSortOptions;

  sort: SortOption = this.sortOptions[0];

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getBooks();
  }

  onSearch(filter: FiltersModel) {
    this.filtersValue = filter;
    this.pageIndex = 0;
    this.getBooks();
  }

  onSort(sort: SortOption) {
    this.sort = sort;
    this.pageIndex = 0;
    this.getBooks();
  }

  ngOnInit(): void {
    this.getBooks();

    if (window.innerWidth < 768) {
      this.displayedColumns = ['title', 'author'];
    }
  }

  getBooks() {
    this.bookResponse$ = this.bookService.getBooks(this.pageIndex, this.pageSize, this.sort, this.filtersValue).pipe(
      map(response => {
        this.totalElemets = response.totalElements;
        return response;
      })
    );
  }

  onEdit(book: Book) {
    this.router.navigate(['dashboard', 'manage', book.id]);
  }

  onDelete(book: Book) {
    console.log('delete', book);
  }
}
