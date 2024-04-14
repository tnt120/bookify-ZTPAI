import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { BookcaseComponent } from './pages/bookcase/bookcase.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookCardComponent } from './components/book-card/book-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    BookcaseComponent,
    SearchBarComponent,
    BookCardComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ]
})
export class BooksModule { }
