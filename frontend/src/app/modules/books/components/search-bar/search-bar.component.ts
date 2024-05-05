import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../../../../core/models/author.model';
import { Genre } from '../../../../core/models/genre.model';
import { FiltersModel } from '../../models/filters.model';

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

  @Output()
  searchEmitter = new EventEmitter<FiltersModel>();

  filters: FiltersModel = {
    title: null,
    author: null,
    genre: null
  }

  onSearch() {
    this.searchEmitter.emit(this.filters);
  }
}