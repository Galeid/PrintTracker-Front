import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderLayoutComponent {
  constructor(public router: Router) {}
  logOut() {
    localStorage.removeItem('idCaja');
    localStorage.removeItem('idUsuario');
    this.router.navigate(['/']);
  }
}
