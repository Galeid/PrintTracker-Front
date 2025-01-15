import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { LoginComponent } from './view/login/login.component';
import { ClientsComponent } from './view/cliente/client.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { SuppliersComponent } from './view/proveedor/supplier.component';
import { OrdersComponent } from './view/pedidos/orders.component';
import { GastosComponent } from './view/gastos/gastos.component';
import { MainLayoutComponent } from './layouts/main/main.component';
import { RegistrosComponent } from './view/registros/registros.component';
import { UsersComponent } from './view/usuario/user.component';
import { ServicesComponent } from './view/services/services.component';

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
        component: ClientsComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'clientes/:clientId/pedidos',
        component: OrdersComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'proveedores',
        component: SuppliersComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'proveedores/:supplierId/gastos',
        component: GastosComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'pedidos',
        component: OrdersComponent,
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
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'servicios',
        component: ServicesComponent,
        canActivate: [redirectLogin],
      }
    ],
  },
];

function redirectLogin(): boolean {
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
