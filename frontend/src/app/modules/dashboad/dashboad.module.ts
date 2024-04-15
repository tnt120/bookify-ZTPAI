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



@NgModule({
  declarations: [
    ManageBooksComponent,
    ManageAuthorsComponent,
    ManageGenresComponent,
    ManageCommentsComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    DashboadRoutingModule,
    SharedModule,
    MatButtonModule
  ]
})
export class DashboadModule { }
