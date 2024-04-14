import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { BookcaseComponent } from './pages/bookcase/bookcase.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookcaseCardComponent } from './components/bookcase-card/bookcase-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActionButtonComponent } from './components/action-button/action-button.component';



@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    BookcaseComponent,
    SearchBarComponent,
    BookCardComponent,
    BookcaseCardComponent,
    ActionButtonComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class BooksModule { }
