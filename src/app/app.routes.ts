import { Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { ClienteComponent } from './view/cliente/cliente.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ProveedorComponent } from './view/proveedor/proveedor.component';
import { PedidosComponent } from './view/pedidos/pedidos.component';
import { PagosComponent } from './view/pagos/pagos.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'clientes',
    component: ClienteComponent,
  },
  {
    path: 'proveedores',
    component: ProveedorComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'pagos',
    component: PagosComponent
  }
];
