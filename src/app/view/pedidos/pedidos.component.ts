import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ClienteService } from '../../services/cliente.service';
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
    DropdownModule,CalendarModule,AutoCompleteModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  tipoServicio = [
    { value: 'tarjetas', label: 'Tarjetas' },
    { value: 'volantes', label: 'Volantes' },
    { value: 'offset', label: 'Servicio Offset' },
    { value: 'plastico', label: 'Servicio de Plástico' },
    { value: 'otro', label: 'Otro' },
  ];
  tipoPago = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'yape', label: 'Yape' },
    { value: 'transferencia', label: 'Transferencia' },
  ];
  filteredClientes:any[]= []
  displayDialog = false;
  pedidos = [];
  pedido: any = {
    descripcion: '',
    monto: 0,
    tipo: 'otro',
    tipoPago: 'efectivo',
    fecha: new Date(),
    idUsuario: '',
    idCliente: '',
    idCaja:'',
  };
  clientes = []
  clienteSelected:any

  constructor(private pedidoService: PedidoService, public router: Router, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getPedidos();
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => (this.clientes = clientes),
      error: (error) => console.error('Error:', error),
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  getPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (pedidos) => (this.pedidos = pedidos),
      error: (error) => console.error('Error:', error),
    });
  }

  addPedido() {
    this.pedido.idCliente = this.clienteSelected.id;
    this.pedido.idUsuario = localStorage.getItem('idUsuario');
    this.pedidoService.addPedido(this.pedido).subscribe({
      next: () => {
        console.log('Cliente agregado correctamente');
        this.displayDialog = false;
        this.pedido = {
          descripcion: '',
          monto: 0,
          tipo: 'otro',
          tipoPago: 'efectivo',
          fecha: new Date(),
          idUsuario: '',
          idCliente: '',
          idCaja:'',
        };
        this.clienteSelected = undefined
        this.getPedidos();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterCliente(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.clientes as any[]).length; i++) {
        let cliente = (this.clientes as any[])[i];
        if (cliente.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(cliente);
        }
    }
    this.filteredClientes = filtered;
  }

  pagarPedido(pedido:any) {
    this.pedidoService.payPedido(pedido.id).subscribe({
      next: () => {
        console.log('Pedido pagado correctamente');
        this.getPedidos();
      },
      error: (error) => console.error('Error:', error),
    })
  }

  anularPedido(pedido:any) {

  }

  isToday(fecha:Date) {
    return new Date(fecha).getDate() === new Date().getDate()
  }
}
