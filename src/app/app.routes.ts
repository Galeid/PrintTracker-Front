import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { LoginComponent } from './view/login/login.component';
import { ClientComponent } from './view/cliente/client.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { SupplierComponent } from './view/proveedor/supplier.component';
import { PedidosComponent } from './view/pedidos/pedidos.component';
import { GastosComponent } from './view/gastos/gastos.component';
import { MainLayoutComponent } from './layouts/main/main.component';
import { RegistrosComponent } from './view/registros/registros.component';
import { UserComponent } from './view/usuario/user.component';

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
        component: ClientComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'clientes/:clienteId/pedidos',
        component: PedidosComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'proveedores',
        component: SupplierComponent,
        canActivate: [redirectLogin],
      },
      {
        path: 'proveedores/:proveedorId/gastos',
        component: GastosComponent,
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
      },
      {
        path: 'usuarios',
        component: UserComponent,
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
