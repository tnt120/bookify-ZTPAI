import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { SearchButtonComponent } from './components/search-button/search-button.component';



@NgModule({
  declarations: [
    InputComponent,
    MultiSelectComponent,
    SearchButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    MultiSelectComponent,
    SearchButtonComponent
  ]
})
export class SharedModule { }
