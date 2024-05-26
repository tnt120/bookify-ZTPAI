import { Component, Inject } from '@angular/core';
import { ConfirimationDialogData } from '../../../../core/models/confirmation-dialog-data.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reading-dialog',
  templateUrl: './reading-dialog.component.html',
  styleUrl: './reading-dialog.component.scss'
})
export class ReadingDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ConfirimationDialogData
  ) { }

  rating = 0;

  comment = '';

  isValid(): boolean {
    if (this.rating < 1 || this.rating > 10) return false;

    return true;
  }

  onType(event: any): void {
    const invalidChars = ['.', ',', 'e', 'E', '+', '-'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }
}
