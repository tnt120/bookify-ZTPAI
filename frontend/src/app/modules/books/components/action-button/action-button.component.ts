import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss'
})
export class ActionButtonComponent implements OnInit {
  @Input({ required: true })
  text!: 'Finished' | 'To read' | 'Delete' | 'Reading';

  icon!: string;

  ngOnInit(): void {
    if (this.text === 'Finished'){
      this.icon = '/assets/icons/finished.svg';
    } else if (this.text === 'To read') {
      this.icon = '/assets/icons/to-read.svg';
    } else if (this.text === 'Delete') {
      this.icon = '/assets/icons/delete.svg';
    } else {
      this.icon = '/assets/icons/reading.svg';
    }
  }

}
