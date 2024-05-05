import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../../../../core/models/author.model';
import { Genre } from '../../../../core/models/genre.model';
import { FiltersModel } from '../../models/filters.model';
import { SortOption } from '../../../../core/models/sort-option.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input({ required: true})
  authors!: Author[];

  @Input({ required: true})
  genres!: Genre[];

  @Input({ required: true})
  sortOptions!: SortOption[];

  @Output()
  searchEmitter = new EventEmitter<FiltersModel>();

  @Output()
  sortEmitter = new EventEmitter<SortOption>();

  activeSort!: SortOption;

  filters: FiltersModel = {
    title: null,
    author: null,
    genre: null
  }

  ngOnInit(): void {
    this.activeSort = this.sortOptions[0];
  }

  onSearch() {
    this.searchEmitter.emit(this.filters);
  }

  onSortSelected(sort: SortOption) {
    this.activeSort = sort;
    this.sortEmitter.emit(sort);
  }
}
