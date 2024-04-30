import { Component, Input } from '@angular/core';
import { HeaderItem } from '../../models/header-item.model';
import { unAuthorizedHeaders } from '../../constants/headers';

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

  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
