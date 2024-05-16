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

@Component({
  selector: 'app-manage-genres',
  templateUrl: './manage-genres.component.html',
  styleUrls: ['./manage-genres.component.scss', '../../styles/manages.style.scss']
})
export class ManageGenresComponent implements OnInit, OnDestroy {
  private readonly genreService = inject(GenreService);

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
    // this.openDialog();
    console.log('add');
  }

  onEdit(genre: Genre) {
    console.log('edit: ', genre);
  }

  onDelete(genre: Genre) {
    console.log('edit: ', genre);
  }
}
