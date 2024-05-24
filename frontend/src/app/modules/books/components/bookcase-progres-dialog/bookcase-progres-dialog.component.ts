import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressDialogData } from '../../models/progres-dialog-data.model';

@Component({
  selector: 'app-bookcase-progres-dialog',
  templateUrl: './bookcase-progres-dialog.component.html',
  styleUrl: './bookcase-progres-dialog.component.scss'
})
export class BookcaseProgresDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ProgressDialogData
  ) { }

  currentPage = 0;

  rating = 0;

  ngOnInit(): void {
    if (this.data.type === 'rating') {
      this.rating = this.data.value;
    } else if (this.data.type === 'page') {
      this.currentPage = this.data.value;
    }
  }

  isValid(): boolean {
    if (this.currentPage === null || this.currentPage < 0) return false;

    if (this.data.type === 'page') {
      return this.currentPage !== this.data.value;
    }

    if (this.data.type === 'rating') {
      if (this.rating < 1 || this.rating > 10) return false;

      return this.rating !== this.data.value;
    }

    return true;
  }

  onType(event: any): void {
    const invalidChars = ['.', ',', 'e', 'E', '+', '-'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }
}
