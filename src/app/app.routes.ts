import { Router, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { ClienteComponent } from './view/cliente/cliente.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProveedorComponent } from './view/proveedor/proveedor.component';
import { PedidosComponent } from './view/pedidos/pedidos.component';
import { GastosComponent } from './view/gastos/gastos.component';
import { inject } from '@angular/core';
import { MainLayoutComponent } from './layouts/main/main.component';
import { RegistrosComponent } from './view/registros/registros.component';

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
        path: 'clientes/:clienteId/pedidos',
        component: PedidosComponent,
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
        path: 'gastos',
        component: GastosComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'registros',
        component: RegistrosComponent,
        canActivate: [redirectLogin],
      }
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
