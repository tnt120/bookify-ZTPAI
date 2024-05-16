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
import { AuthorRequestUpdate } from '../../../../core/models/author-request-update';
import { ConfirimationDialogData } from '../../../../core/models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-authors',
  templateUrl: './manage-authors.component.html',
  styleUrls: ['./manage-authors.component.scss', '../../styles/manages.style.scss']
})
export class ManageAuthorsComponent implements OnInit, OnDestroy {
  private readonly authorService = inject(AuthorService);

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
        } else if (author) {
          const data: AuthorRequestUpdate = this.getModifiedData(author, result);
          this.authorService.updateAuthor(author.id!, data).subscribe({
            next: () => {
              this.getAuthors();
            },
            error: (error) => {
              console.error(error);
            }
          })
        }
      }
    }));
  }

  onEdit(author: Author) {
    this.openDialog(author);
  }

  onDelete(author: Author) {
    this.openDeleteDialog(author);
  }

  getModifiedData(authorOriginal: Author, authorModified: Author): AuthorRequestUpdate {
    const modifiedData: AuthorRequestUpdate = {} as AuthorRequestUpdate;

    Object.keys(authorOriginal).forEach(key => {
      if (authorOriginal[key as keyof Author] !== authorModified[key as keyof Author]) {
        modifiedData[key as keyof Author] = authorModified[key as keyof Author] as any;
      } else {
        modifiedData[key as keyof Author] = null as any;
      }
    });

    return modifiedData as AuthorRequestUpdate;
  }

  openDeleteDialog(author: Author) {
    const data: ConfirimationDialogData = {
      title: 'Delete author',
      message: `Are you sure you want to delete ${author.firstName} ${author.lastName}?`,
      additionalMessage: 'Note that tis action is irreversible and will delete all the data associated with this author.',
      confirmText: 'Delete'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authorService.deleteAuthor(author.id!).subscribe({
          next: () => {
            this.getAuthors();
          },
          error: (err) => {
            console.error(err);
          }
        })
      }
    })
  }
}
