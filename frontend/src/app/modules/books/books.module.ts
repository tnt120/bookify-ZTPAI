import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { BookcaseComponent } from './pages/bookcase/bookcase.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    BookcaseComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
