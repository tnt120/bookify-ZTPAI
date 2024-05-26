import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GenreService } from '../../../../core/services/genre/genre.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Genre } from '../../../../core/models/genre.model';
import { dashboardTabHeaders } from '../../../../core/constants/headers';
import { HeaderItem } from '../../../../core/models/header-item.model';
import { FiltersGenresModel } from '../../../books/models/filters-genres-model.model';
import { SortOption } from '../../../../core/models/sort-option.model';
import { baseSortGenresOptions } from '../../../../core/constants/sort-options';
import { ManageGenreDialogData } from '../../../books/models/manage-genre-dialog-data.model';
import { ManageGenreDialogComponent } from '../../components/manage-genre-dialog/manage-genre-dialog.component';
import { GenreRequestUpdate } from '../../../../core/models/genre-request-update.model';
import { ConfirimationDialogData } from '../../../../core/models/confirmation-dialog-data.model';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CustomSnackbarService } from '../../../../core/services/custom-snackbar/custom-snackbar.service';

@Component({
  selector: 'app-manage-genres',
  templateUrl: './manage-genres.component.html',
  styleUrls: ['./manage-genres.component.scss', '../../styles/manages.style.scss']
})
export class ManageGenresComponent implements OnInit, OnDestroy {
  private readonly genreService = inject(GenreService);
  private readonly customSnackbarService = inject(CustomSnackbarService);

  constructor(
    public dialog: MatDialog
  ) {}

  protected genres$: Observable<Genre[]> = this.genreService.genres$;

  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['name'];

  navItems: HeaderItem[] = dashboardTabHeaders;

  filtersValue: FiltersGenresModel = {
    name: null,
  }

  sortOptions: SortOption[] = baseSortGenresOptions;

  sort: SortOption = this.sortOptions[0];

  ngOnInit(): void {
    this.getGenres();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getGenres() {
    this.subscriptions.push(this.genreService.getGenresManagement(this.sort, this.filtersValue).subscribe({
      next: (response: Genre[]) => { },
      error: (error) => {
        console.error(error);
      }
    }));
  }

  onSearch(filter: FiltersGenresModel) {
    this.filtersValue = filter;
    this.getGenres();
  }

  onSort(sort: SortOption) {
    this.sort = sort;
    this.getGenres();
  }

  onAdd() {
    this.openDialog();
  }

  openDialog(genre?: Genre) {
    let data: ManageGenreDialogData;

    if (genre) {
      data = {
        title: 'Edit',
        confirmText: 'Save',
        genre,
      };
    } else {
      data = {
        title: 'Add',
        confirmText: 'Save',
      };
    }

    const dialogRef = this.dialog.open(ManageGenreDialogComponent, { data, width: '400px' });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (data.title === 'Add') {
          this.genreService.saveGenre(result).subscribe({
            next: (id: number) => {
              this.getGenres();
              this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Genre has been added successfully', type: 'success', duration: 2500 })
            },
            error: (error) => {
              console.error(error);
              this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while adding genre', type: 'error', duration: 2500 });
            }
          })
        } else if (genre) {
          const data: GenreRequestUpdate = this.getModifiedData(genre, result);
          this.subscriptions.push(this.genreService.updateGenre(genre.id!, data).subscribe({
            next: () => {
              this.getGenres();
              this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Genre has been updated successfully', type: 'success', duration: 2500 });
            },
            error: (error) => {
              console.error(error);
              this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while updating genre', type: 'error', duration: 2500 });
            }
          }));
        }
      }
    }))
  }

  onEdit(genre: Genre) {
    this.openDialog(genre);
  }

  onDelete(genre: Genre) {
    this.openDeleteDialog(genre);
  }

  getModifiedData(genreOriginal: Genre, genreModified: Genre): GenreRequestUpdate {
    const modifiedData: GenreRequestUpdate = {} as GenreRequestUpdate;

    Object.keys(genreOriginal).forEach(key => {
      if (genreOriginal[key as keyof Genre] !== genreModified[key as keyof Genre]) {
        modifiedData[key as keyof Genre] = genreModified[key as keyof Genre] as any;
      } else {
        modifiedData[key as keyof Genre] = null as any;
      }
    });

    return modifiedData as GenreRequestUpdate;
  }

  openDeleteDialog(genre: Genre) {
    const data: ConfirimationDialogData = {
      title: 'Delete genre',
      message: `Are you sure you want to delete ${genre.name}?`,
      additionalMessage: 'Note that tis action is irreversible and will delete all the data associated with this genre.',
      confirmText: 'Delete',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.genreService.deleteGenre(genre.id!).subscribe({
          next: () => {
            this.getGenres();
            this.customSnackbarService.openCustomSnackBar({ title: 'Success', message: 'Genre has been deleted successfully', type: 'success', duration: 2500 });
          },
          error: (error) => {
            console.error(error);
            this.customSnackbarService.openCustomSnackBar({ title: 'Error', message: 'Error while deleting genre', type: 'error', duration: 2500 });
          }
        }));
      }
    }))
  }
}
