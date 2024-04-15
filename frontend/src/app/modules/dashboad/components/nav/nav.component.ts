import { Component, Input } from '@angular/core';
import { HeaderItem } from '../../../../core/models/header-item.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  @Input({ required: true })
  items!: HeaderItem[];

  @Input({ required: true })
  active!: string;
}
