import { Component } from '@angular/core';
import { HeaderItem } from './core/models/header-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bookify';

  mockHeaderItems: HeaderItem[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Bookcase',
      path: '/bookcase'
    }
  ]
}
