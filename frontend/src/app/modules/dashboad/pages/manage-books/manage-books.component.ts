import { PageResponse } from './../../../../core/models/page-response';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirimationDialogData } from '../../../../core/models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { BookReponse } from '../../../../core/models/book-reponse.model';

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

  constructor(
    public dialog: MatDialog
  ) {}

  protected books$: Observable<BookReponse[]> = this.bookService.books$;


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
    this.bookService.getBooks(this.pageIndex, this.pageSize, this.sort, this.filtersValue).subscribe({
      next: (response: PageResponse) => {
        this.totalElemets = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onEdit(book: BookReponse) {
    this.router.navigate(['dashboard', 'manage', book.id]);
  }

  onDelete(book: BookReponse) {
    this.openDialog(book);
  }

  openDialog(book: BookReponse) {
    const data: ConfirimationDialogData = {
      title: 'Delete book',
      message: `Are you sure you want to delete ${book.title}?`,
      additionalMessage: 'Note that tis action is irreversible and will delete all the data associated with this book.',
      confirmText: 'Delete'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.deleteBook(book.id).subscribe({
          next: () => {
            this.getBooks();
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
    })
  }
}
