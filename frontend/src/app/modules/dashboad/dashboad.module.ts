import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { DashboadRoutingModule } from './dashboad-routing.module';
import { ManageBooksComponent } from './pages/manage-books/manage-books.component';
import { ManageAuthorsComponent } from './pages/manage-authors/manage-authors.component';
import { ManageGenresComponent } from './pages/manage-genres/manage-genres.component';
import { ManageCommentsComponent } from './pages/manage-comments/manage-comments.component';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './components/nav/nav.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ManageBooksComponent,
    ManageAuthorsComponent,
    ManageGenresComponent,
    ManageCommentsComponent,
    NavComponent,
    ManageBookComponent
  ],
  imports: [
    CommonModule,
    DashboadRoutingModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class DashboadModule { }
