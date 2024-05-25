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

  comment = '';

  ngOnInit(): void {
    switch (this.data.type) {
      case 'page':
        this.currentPage = this.data.value;
        if (this.data.value === 0) this.data.value = -1;
        break;
      case 'rating':
        this.rating = this.data.value;
        break;
      case 'comment':
        if (!this.data.comment) this.data.comment = '';
        this.comment = this.data.comment;
        break;
    }
    if (this.data.type === 'rating') {
      
    } else if (this.data.type === 'page') {
      
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

    if (this.data.type === 'comment') {
      if (this.comment.length === 0) return false;
      return this.comment !== this.data.comment;
    }

    return true;
  }

  onType(event: any): void {
    const invalidChars = ['.', ',', 'e', 'E', '+', '-'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  dialogResolve(type: string) {
    let resultObject: any = {};

    switch (this.data.type) {
      case 'page':
        resultObject = { currentPage: this.currentPage };
        break;
      case 'rating':
        resultObject = { rating: this.rating };
        break;
      case 'comment':
        resultObject = { type: type,  comment: this.comment };
    }

    return resultObject;
  }
}
