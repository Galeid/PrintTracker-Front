import { Router, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { ClienteComponent } from './view/cliente/cliente.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProveedorComponent } from './view/proveedor/proveedor.component';
import { PedidosComponent } from './view/pedidos/pedidos.component';
import { PagosComponent } from './view/pagos/pagos.component';
import { inject } from '@angular/core';
import { MainLayoutComponent } from './layouts/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'clientes',
        component: ClienteComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'proveedores',
        component: ProveedorComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'pagos',
        component: PagosComponent,
        canActivate: [redirectLogin],
      },
    ],
  },
];

function redirectLogin() {
  const router = inject(Router);
  if (localStorage.getItem('idUsuario')) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
