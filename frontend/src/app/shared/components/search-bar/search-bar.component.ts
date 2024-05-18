import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '../../../core/models/author.model';
import { Genre } from '../../../core/models/genre.model';
import { SortOption } from '../../../core/models/sort-option.model';
import { FiltersBookModel } from '../../../modules/books/models/filters-books.model';
import { FiltersAuthorsModel } from '../../../modules/books/models/filters-authors.model';
import { FiltersGenresModel } from '../../../modules/books/models/filters-genres-model.model';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input({ required: true })
  type!: 'books' | 'authors' | 'genres' | 'comments';

  @Input()
  authors!: Author[];

  @Input()
  genres!: Genre[];

  @Input()
  sortOptions!: SortOption[];

  @Output()
  searchBookEmitter = new EventEmitter<FiltersBookModel>();

  @Output()
  searchAuthorEmitter = new EventEmitter<FiltersAuthorsModel>();

  @Output()
  searchGenreEmitter = new EventEmitter<FiltersGenresModel>();

  @Output()
  sortEmitter = new EventEmitter<SortOption>();

  activeSort!: SortOption;

  filtersBook: FiltersBookModel = {
    title: null,
    author: null,
    genre: null
  }

  filtersAuthor: FiltersAuthorsModel = {
    firstName: null,
    lastName: null
  }

  filtersGenre: FiltersGenresModel = {
    name: null
  }

  ngOnInit(): void {
    this.activeSort = this.sortOptions[0];
  }

  onSearch() {
    switch (this.type) {
      case 'books':
        this.searchBookEmitter.emit(this.filtersBook);
        break;
      case 'authors':
        this.searchAuthorEmitter.emit(this.filtersAuthor);
        break;
      case 'genres':
        this.searchGenreEmitter.emit(this.filtersGenre);
        break;
      // case 'comments':
      //   this.searchEmitter.emit(this.filters);
      //   break;
    }
  }

  onSortSelected(sort: SortOption) {
    this.activeSort = sort;
    this.sortEmitter.emit(sort);
  }
}
