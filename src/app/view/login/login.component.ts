import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const item = localStorage.getItem('token');
    if (item) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('branch', response.branch);
          localStorage.setItem(
            'lockDate',
            response.lockDate ? `${response.lockDate.getTime()}` : '0'
          );

          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
