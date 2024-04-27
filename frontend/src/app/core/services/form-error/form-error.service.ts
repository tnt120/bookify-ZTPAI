import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  getErrorMessage(form: FormGroup, field: string, name: string): string {
    const errors = form.controls[field]?.errors;
    if (!errors) return '';

    const errorMessages: { [key: string]: string } = {
      required: `${name} is required`,
      email: `${name} is invalid`,
      minlength: `${name} must be at least ${errors['minlength']?.requiredLength} characters`
    };

    for (const error in errors) {
      if (errors[error] && errorMessages[error]) {
        return errorMessages[error];
      }
    }

    return '';
  }
}
