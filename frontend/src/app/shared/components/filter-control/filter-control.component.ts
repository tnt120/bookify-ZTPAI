import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOption } from '../../../core/models/sort-option.model';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrl: './filter-control.component.scss'
})
export class FilterControlComponent {
  @Input({ required: true })
  sortOptions!: SortOption[];

  @Input({ required: true })
  activeSort!: SortOption;

  @Output()
  optionSelected: EventEmitter<SortOption> = new EventEmitter<SortOption>();

  onSelect(option: SortOption) {
    this.optionSelected.emit(option);
  }

  getActiveStyle(option: SortOption) {
    return option === this.activeSort ? { 'background-color': '#464e7d', 'color': 'white' } : {};
  }
}
