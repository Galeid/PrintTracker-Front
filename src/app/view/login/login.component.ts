import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor( private authService: AuthService,
    private cajaService: CajaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const item = localStorage.getItem('idUsuario');
    if (item) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  getCaja() {
    this.cajaService.getCaja().subscribe({
      next: (response) => {
        localStorage.setItem('idCaja', response.id);
      },
      error: (error) => {
        console.error('Error getting caja:', error);
      }
    })
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response,'true')
        if (response) {
          this.getCaja();
          localStorage.setItem('idUsuario', response.id);
          this.router.navigateByUrl('/dashboard')
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    }
    );
  }
}
