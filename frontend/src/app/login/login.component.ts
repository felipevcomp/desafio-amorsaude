import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '@/app/_services/auth.service';
import {StorageService} from '@/app/_services/storage.service';
import {
  LoginForm,
  LoginRequest,
  LoginResponse,
  ValidationErrors
} from '@/app/_shared/models/auth.model';

/**
 *
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginForm = {email: null, password: null};
  isLoggedIn = false;
  showPassword = false;
  isLoginFailed = false;
  errorMessage = '';
  fieldErrors: ValidationErrors = {};
  loading = false;

  /**
   *
   * @param authService
   * @param storageService
   * @param router
   */
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  /**
   *
   */
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/clinic']);
    }
  }

  /**
   *
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   *
   * @param f
   */
  onSubmit(f: NgForm): void {
    if (!f.valid) {
      f.form.markAllAsTouched();
      this.errorMessage = 'Dados incorretos. Por favor, revise seus dados e tente novamente.';
      return;
    }

    this.loading = true;

    const payload: LoginRequest = {
      email: this.form.email ?? '',
      password: this.form.password ?? ''
    };

    this.authService.login(payload).subscribe({
      next: (data: LoginResponse) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.loading = false;
        this.router.navigate(['/clinic']);
      },
      error: err => {
        f.form.markAllAsTouched();
        this.errorMessage = 'Senha ou usuário incorretos, revise suas credenciais!';
        this.fieldErrors = err.status === 422 && err.error ? err.error : {email: [''], password: ['']};
        this.isLoginFailed = true;
        this.loading = false;
      }
    });
  }
}

