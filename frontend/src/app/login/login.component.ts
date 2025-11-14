import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  fieldErrors: any = {};
  showPassword = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/clinic']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(f: any): void {
    if (!f.valid) {
      f.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form;

    this.authService.login({ email, password }).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/clinic']);
      },
      error: err => {
        f.submitted = true;
        f.form.markAllAsTouched();

        if (err.status === 422 && err.error) {
          this.errorMessage = '';
          this.fieldErrors = err.error;
        }
        else {
          this.errorMessage = err.error?.message || 'Credenciais inválidas';

          this.fieldErrors = {
            email: [''],
            password: ['']
          };
        }

        this.isLoginFailed = true;
      }
    });
  }
}
