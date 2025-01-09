import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderLayoutComponent implements OnInit {
  branch: string = '';

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.branch = localStorage.getItem('branch') || '';
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('branch');
    localStorage.removeItem('role');
    localStorage.removeItem('lockDate');

    this.router.navigate(['/']);
  }
}
