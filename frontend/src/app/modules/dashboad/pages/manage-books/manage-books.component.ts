import { basePagination } from './../../../../core/constants/paginations-options';
import { PageResponse } from './../../../../core/models/page-response';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HeaderItem } from '../../../../core/models/header-item.model';
import { BookService } from '../../../../core/services/book/book.service';
import { SortOption } from '../../../../core/models/sort-option.model';
import { PageEvent } from '@angular/material/paginator';
import { FiltersBookModel } from '../../../books/models/filters-books.model';
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
import { Pagination } from '../../../../core/models/pagination.model';
import { CustomSnackbarService } from '../../../../core/services/custom-snackbar/custom-snackbar.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss', '../../styles/manages.style.scss']
})
export class ManageBooksComponent implements OnInit, OnDestroy {
  private readonly bookService = inject(BookService);
  private readonly genreService = inject(GenreService);
  private readonly authorService = inject(AuthorService);
  private readonly router = inject(Router);
  private readonly customSnackbarService = inject(CustomSnackbarService);

  constructor(
    public dialog: MatDialog
  ) {}

  protected books$: Observable<BookReponse[]> = this.bookService.books$;

  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['title', 'author', 'genre', 'pages', 'releaseDate'];

  navItems: HeaderItem[] = dashboardTabHeaders;

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

  ngOnInit(): void {
    this.getBooks();

    if (window.innerWidth < 768) {
      this.displayedColumns = ['title', 'author'];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getBooks() {
    this.subscriptions.push(this.bookService.getBooks(this.pagination.pageIndex, this.pagination.pageSize, this.sort, this.filtersValue).subscribe({
      next: (response: PageResponse<BookReponse>) => {
        this.pagination.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    }));
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
            this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Book has been deleted successfully', type: 'success', duration: 2500});
          },
          error: (err) => {
            console.error(err);
            this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while deleting book', type: 'error', duration: 2500});
          }
        })
      }
    })
  }
}
