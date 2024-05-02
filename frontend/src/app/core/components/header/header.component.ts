import { Component, Input, inject } from '@angular/core';
import { HeaderItem } from '../../models/header-item.model';
import { unAuthorizedHeaders } from '../../constants/headers';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectUser } from '../../store/reducers';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input()
  items: HeaderItem[] | null = unAuthorizedHeaders;

  @Input()
  isLogged: boolean | null = false;

  private readonly authService = inject(AuthService);
  private readonly store = inject(Store);

  userFirstName$: Observable<User> = this.store.select(selectUser);

  isOpen = false;

  isProfileMenuOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
  }
}
