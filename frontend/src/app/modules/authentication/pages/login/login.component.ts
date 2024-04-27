import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TokenService } from '../../../../core/services/token/token.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from '../../../../core/services/form-error/form-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.styles.scss']
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly formErrorService = inject(FormErrorService);

  errors = {
    email: '',
    password: '',
    form: ''
  }
  
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  hidePassword = true;

  updateError(field: keyof typeof this.errors, name: string) {
    this.errors[field] = this.formErrorService.getErrorMessage(this.loginForm, field, name);
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const credentials: { email: string, password: string } = {
      email: email || '',
      password: password || ''
    };

    this.authService.login(credentials).subscribe({
      next: res => {
        this.tokenService.token = res.token;
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Failed to login', err);
        this.errors.form = err.error.description;
        this.loginForm.reset();
      }
    });
  }

  onRegister() {
    this.router.navigate(['auth/register']);
  }

  toogleHide() {
    this.hidePassword = !this.hidePassword;
  }
}
