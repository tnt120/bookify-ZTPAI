import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressDialogData } from '../../models/progres-dialog-data.model';

@Component({
  selector: 'app-bookcase-progres-dialog',
  templateUrl: './bookcase-progres-dialog.component.html',
  styleUrl: './bookcase-progres-dialog.component.scss'
})
export class BookcaseProgresDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ProgressDialogData
  ) { }

  currentPage = 0;

  isValid(): boolean {
    if (this.currentPage === null || this.currentPage < 0) return false;

    return true;
  }
}
