import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthorService } from '../../../../core/services/author/author.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderItem } from '../../../../core/models/header-item.model';
import { dashboardTabHeaders } from '../../../../core/constants/headers';
import { FiltersAuthorsModel } from '../../../books/models/filters-authors.model';
import { SortOption } from '../../../../core/models/sort-option.model';
import { baseSortAuthorsOptions } from '../../../../core/constants/sort-options';
import { Observable, Subscription } from 'rxjs';
import { Author } from '../../../../core/models/author.model';
import { ManageAuthorDialogData } from '../../../books/models/mange-author-dialog-data.model';
import { ManageAuthorDialogComponent } from '../../components/manage-author-dialog/manage-author-dialog.component';

@Component({
  selector: 'app-manage-authors',
  templateUrl: './manage-authors.component.html',
  styleUrls: ['./manage-authors.component.scss', '../../styles/manages.style.scss']
})
export class ManageAuthorsComponent implements OnInit, OnDestroy {
  private readonly authorService = inject(AuthorService);
  private readonly router = inject(Router);

  constructor(
    public dialog: MatDialog
  ) {}

  protected authors$: Observable<Author[]> = this.authorService.authors$;

  subscribions: Subscription[] = [];

  displayedColumns: string[] = ['lastName', 'firstName'];

  navItems: HeaderItem[] = dashboardTabHeaders;

  filtersValue: FiltersAuthorsModel = {
    firstName: null,
    lastName: null,
  }

  sortOptions: SortOption[] = baseSortAuthorsOptions;

  sort: SortOption = this.sortOptions[0];

  ngOnInit(): void {
    this.getAuthors();
  }


  ngOnDestroy(): void {
    this.subscribions.forEach(sub => sub.unsubscribe());
  }

  getAuthors() {
    this.subscribions.push(this.authorService.getAuthorsManagement(this.sort, this.filtersValue).subscribe({
      next: (response: Author[]) => { },
      error: (error) => {
        console.error(error);
      }
    }));
  }

  onSearch(filter: FiltersAuthorsModel) {
    this.filtersValue = filter;
    this.getAuthors();
  }

  onSort(sort: SortOption) {
    this.sort = sort;
    this.getAuthors();
  }

  onAdd() {
    this.openDialog();
  }

  openDialog(author?: Author) {
    let data: ManageAuthorDialogData;

    if (author) {
      data = {
        title: 'Edit',
        confirmText: 'Save',
        author: author,
      }
    } else {
      data = {
        title: 'Add',
        confirmText: 'Save',
      }
    }

    const dialogRef = this.dialog.open(ManageAuthorDialogComponent, { data, width: '400px'});

    this.subscribions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (data.title === 'Add') {
          this.authorService.saveAuthor(result).subscribe({
            next: (id: number) => {
              this.getAuthors();
            },
            error: (error) => {
              console.error(error);
            }
          })
        } else {
          console.log('Edit author', result);
        }
      }
    }));
  }

  onEdit(author: Author) {
    console.log('Edit author', author);
  }

  onDelete(author: Author) {
    console.log('Delete author', author);
  }
}
