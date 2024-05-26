import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first, last } from 'rxjs';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';
import { RegisterRequest } from '../../../../core/models/register-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.styles.scss']
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly formErrorService = inject(FormErrorService);

  errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    form: ''
  }

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  hidePassword = true;

  updateError(field: keyof typeof this.errors, name: string) {
    this.errors[field] = this.formErrorService.getErrorMessage(this.registerForm, field, name);
  }

  onRegistration() {
    if (this.registerForm.invalid) return;

    const { firstName, lastName, email, password } = this.registerForm.value;
    const credentials: RegisterRequest = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      password: password || ''
    };

    this.authService.register(credentials).subscribe({
      next: res => {
        this.tokenService.token = res.token;
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Failed to register', err);
        this.errors.form = err.error.message
        this.registerForm.reset();
      }
    });
  }

  onLogin() {
    this.router.navigate(['auth']);
  }

  toogleHide() {
    this.hidePassword = !this.hidePassword;
  }
}
