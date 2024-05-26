import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBooksComponent } from './pages/manage-books/manage-books.component';
import { ManageAuthorsComponent } from './pages/manage-authors/manage-authors.component';
import { ManageGenresComponent } from './pages/manage-genres/manage-genres.component';
import { ManageCommentsComponent } from './pages/manage-comments/manage-comments.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { CommentApprovalComponent } from './pages/comment-approval/comment-approval.component';

const routes: Routes = [
  {
    path: '',
    component: ManageBooksComponent
  },
  {
    path: 'authors',
    component: ManageAuthorsComponent
  },
  {
    path: 'genres',
    component: ManageGenresComponent
  },
  {
    path: 'comments',
    component: ManageCommentsComponent
  },
  {
    path: 'manage/:id',
    component: ManageBookComponent
  },
  {
    path: 'commentApproval/:id',
    component: CommentApprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboadRoutingModule { }
