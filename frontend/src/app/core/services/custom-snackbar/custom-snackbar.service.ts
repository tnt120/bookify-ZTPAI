import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarData } from '../../models/snackbar-data.model';
import { CustomSnackbarComponent } from '../../../shared/components/snackbar/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openCustomSnackBar(data: SnackBarData) {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: data.duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        snackBar: this._snackBar
      },
      panelClass: this.getPanelClass(data.type)
    })
  }

  private getPanelClass(type: string) {
    switch (type) {
      case 'success':
        return 'success-snackbar';
      case 'error':
        return 'error-snackbar';
      case 'warning':
        return 'warning-snackbar';
      default:
        return 'info-snackbar';
    }
  }
}