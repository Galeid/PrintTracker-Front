import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarLayoutComponent {
  items = [
    {
      title: 'Usuarios',
      icon: 'pi pi-address-book',
      route: '/usuarios',
    },
    {
      title: 'Clientes',
      icon: 'pi pi-users',
      route: '/clientes',
    },
    {
      title: 'Proveedores',
      icon: 'pi pi-box',
      route: '/proveedores',
    },
    {
      title: 'Pedidos',
      icon: 'pi pi-shopping-bag',
      route: '/pedidos',
    },
    {
      title: 'Gastos',
      icon: 'pi pi-arrow-circle-down',
      route: '/gastos',
    },
    {
      title: 'Registros',
      icon: 'pi pi-book',
      route: '/registros',
    },
  ];

  constructor(public router: Router) {}
}
