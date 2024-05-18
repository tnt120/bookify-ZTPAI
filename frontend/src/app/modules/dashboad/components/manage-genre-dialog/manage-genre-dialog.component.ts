import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageGenreDialogData } from '../../../books/models/manage-genre-dialog-data.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';

@Component({
  selector: 'app-manage-genre-dialog',
  templateUrl: './manage-genre-dialog.component.html',
  styleUrl: './manage-genre-dialog.component.scss'
})
export class ManageGenreDialogComponent implements OnInit {

  errors = { name: '' };

  manageForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ManageGenreDialogData,
    private formBuilder: FormBuilder,
    private formErrorService: FormErrorService
  ) { }

  ngOnInit(): void {
    if (this.data.title === 'Edit' && this.data.genre) {
      this.manageForm.patchValue(this.data.genre);
    }
  }

  updateError(field: keyof typeof this.errors, name: string) {
    this.errors[field] = this.formErrorService.getErrorMessage(this.manageForm, field, name);
  }

  isFormValid() {
    if (this.data.title === 'Add') {
      return this.manageForm.invalid;
    }

    const currentData = this.manageForm.value as { [key: string]: any };

    const isModified = Object.keys(currentData).some(key => {
      return currentData[key] !== (this.data.genre as any)[key];
    });

    return this.manageForm.invalid || !isModified;
  }
}
