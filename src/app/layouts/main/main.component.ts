import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../header/header.component';
import { SidebarLayoutComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, HeaderLayoutComponent, SidebarLayoutComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainLayoutComponent {}
