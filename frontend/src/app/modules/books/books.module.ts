import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { BookcaseComponent } from './pages/bookcase/bookcase.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookcaseCardComponent } from './components/bookcase-card/bookcase-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { CommentComponent } from './components/comment/comment.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookcaseActionsComponent } from './components/bookcase-actions/bookcase-actions.component';
import { BookcaseProgresDialogComponent } from './components/bookcase-progres-dialog/bookcase-progres-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReadingDialogComponent } from './components/reading-dialog/reading-dialog.component';
import { CommentsDialogComponent } from './components/comments-dialog/comments-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    BookcaseComponent,
    BookCardComponent,
    BookcaseCardComponent,
    ActionButtonComponent,
    CommentComponent,
    BookcaseActionsComponent,
    BookcaseProgresDialogComponent,
    ReadingDialogComponent,
    CommentsDialogComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class BooksModule { }
