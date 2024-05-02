import { Component, OnInit, inject } from '@angular/core';
import { HeaderItem } from './core/models/header-item.model';
import { Store } from '@ngrx/store';
import { selectUser, selectIsLogged } from './core/store/reducers';
import { Roles } from './core/enums/roles.enum';
import { unAuthorizedHeaders, userHeaders, adminHeaders } from './core/constants/headers';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  title = 'Bookify';

  isLogged$ = this.store.select(selectIsLogged);

  headerItems$!: Observable<HeaderItem[]>;

  ngOnInit(): void {
    this.headerItems$ = this.store.select(selectUser).pipe(
      map(user => {
        switch (user.role) {
          case Roles.unAuthorized: return unAuthorizedHeaders;
          case Roles.User: return userHeaders;
          case Roles.Admin: return adminHeaders;
          default: return unAuthorizedHeaders;
        }
      })
    )
  }
}
