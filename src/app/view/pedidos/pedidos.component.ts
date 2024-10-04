import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../services/cliente.service';
import { ClienteEntity } from '../../entities/cliente/cliente.entity';
import { PedidoEntity } from '../../entities/pedido/pedido.entity';
import { PedidoModel } from '../../entities/pedido/pedido.model';
import { TipoPago, TipoPedido } from '../../entities/enums/pedido.enums';

const model: PedidoModel = {
  descripcion: '',
  monto: 0,
  tipo: TipoPedido.OTRO,
  tipoPago: TipoPago.EFECTIVO,
  fecha: new Date(),
  idUsuario: '',
  idCliente: '',
  idCaja: '',
};

const tipoOptions = [
  { value: TipoPedido.OTRO, label: 'Otro' },
  { value: TipoPedido.TARJETAS, label: 'Tarjetas' },
  { value: TipoPedido.VOLANTES, label: 'Volantes' },
  { value: TipoPedido.SERVICIO_OFFSET, label: 'Servicio Offset' },
  { value: TipoPedido.SERVICIO_PLASTICO, label: 'Servicio de Plástico' },
];

const pagoOptions = [
  { value: TipoPago.EFECTIVO, label: 'Efectivo' },
  { value: TipoPago.YAPE, label: 'Yape' },
  { value: TipoPago.TRANSFERENCIA, label: 'Transferencia' },
];

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  pedido: PedidoModel = model;
  pedidos: PedidoEntity[] = [];
  dialog: boolean = false;
  dataFiltered: PedidoEntity[] = [];
  clienteSelected: ClienteEntity | undefined;
  clientes: ClienteEntity[] = [];
  clientesFiltered: ClienteEntity[] = [];
  tipoOptions = tipoOptions;
  pagoOptions = pagoOptions;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getPedidos();
    this.getClientes();
  }

  getClientes() {
    this.clienteService.get().subscribe({
      next: (data) => {
        this.clientes = [...data];
        this.clientesFiltered = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getPedidos(): void {
    this.pedidoService.get().subscribe({
      next: (data) => {
        this.pedidos = [...data];
        this.dataFiltered = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  addPedido() {
    this.pedido.idCliente = this.clienteSelected?.id || '';
    this.pedido.idUsuario = localStorage.getItem('idUsuario') || '';
    this.pedidoService.add(this.pedido).subscribe({
      next: () => {
        this.dialog = false;
        this.getPedidos();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  payPedido(pedido: any) {
    this.pedidoService.pay(pedido.id).subscribe({
      next: () => {
        console.log('Pedido pagado correctamente');
        this.getPedidos();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  cancelPedido(pedido: any) {}

  filterCliente(event: AutoCompleteCompleteEvent) {
    let filtered: ClienteEntity[] = [];
    let query = event.query;

    for (let i = 0; i < this.clientes.length; i++) {
      let cliente = this.clientes[i];
      if (cliente.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(cliente);
      }
    }
    this.clientesFiltered = filtered;
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.pedido = model;
    this.clienteSelected = undefined;
  }

  isToday(fecha: Date) {
    return new Date(fecha).getDate() === new Date().getDate();
  }

  capitalize(string: string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }

  formatDate(dateToFormat: Date): string {
    const date = new Date(dateToFormat);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear().toString().slice(0);
    return `${dia}/${mes}/${anio}`;
  }
}
