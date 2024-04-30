import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { BookcaseComponent } from './pages/bookcase/bookcase.component';
import { notAuthenticatedGuard, userGuard } from '../../core/guards/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [notAuthenticatedGuard]
  },
  {
    path: 'bookcase',
    component: BookcaseComponent,
    canActivate: [userGuard]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [notAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
