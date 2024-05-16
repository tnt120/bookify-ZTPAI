import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageAuthorDialogData } from '../../../books/models/mange-author-dialog-data.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';
import { AuthorService } from '../../../../core/services/author/author.service';

@Component({
  selector: 'app-manage-author-dialog',
  templateUrl: './manage-author-dialog.component.html',
  styleUrl: './manage-author-dialog.component.scss'
})
export class ManageAuthorDialogComponent implements OnInit {

  errors = {
    firstName: '',
    lastName: '',
  }

  manageForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: ManageAuthorDialogData,
    private formBuilder: FormBuilder,
    private formErrorService: FormErrorService,
  ) { }

  ngOnInit(): void {
    if (this.data.title === 'Edit' && this.data.author) {
      this.manageForm.patchValue(this.data.author);
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
      return currentData[key] !== (this.data.author as any)[key];
    });

    return this.manageForm.invalid || !isModified;
  }
}
