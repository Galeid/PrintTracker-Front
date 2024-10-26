import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableFilterEvent, TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';

import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../services/cliente.service';
import { ClienteEntity } from '../../entities/cliente/cliente.entity';
import { PedidoEntity } from '../../entities/pedido/pedido.entity';
import { PedidoModel } from '../../entities/pedido/pedido.model';
import { TipoPago, TipoPedido } from '../../entities/enums/pedido.enums';
import { Utils } from '../../utils/utils';

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
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  pedido: PedidoModel = { ...model };
  pedidos: PedidoEntity[] = [];
  dialog: boolean = false;
  payDialog: boolean = false;
  dataFiltered: PedidoEntity[] = [];
  tableFiltered: PedidoEntity[] = [];
  clienteSelected: ClienteEntity | undefined;
  clientes: ClienteEntity[] = [];
  clientesFiltered: ClienteEntity[] = [];
  tipoOptions = tipoOptions;
  pagoOptions = pagoOptions;
  @Input() clienteId: string | undefined;
  tipoPago: TipoPago = TipoPago.EFECTIVO;
  payId: string = '';
  @ViewChild('table') table!: ElementRef;

  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;

  filterServicios: any[] | null = null;

  protected readonly Utils = Utils;

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
    if (this.clienteId) {
      this.pedidoService.getByCliente(this.clienteId).subscribe({
        next: (data) => {
          this.pedidos = [...data];
          this.dataFiltered = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    } else {
      this.pedidoService.get().subscribe({
        next: (data) => {
          this.pedidos = [...data];
          this.dataFiltered = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    }
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

  payPedido(id: string) {
    this.pedidoService.pay(id, this.tipoPago).subscribe({
      next: () => {
        console.log('Pedido pagado correctamente');
        this.getPedidos();
        this.showPayDialog(false);
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

  getClienteById(id: string): ClienteEntity | undefined {
    return this.clientes.find((cliente) => cliente.id === id);
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  showPayDialog(visible: boolean, id?: string) {
    this.payDialog = visible;
    if (id) this.payId = id;
  }

  hideDialog() {
    this.pedido = { ...model, fecha: new Date() };
    this.clienteSelected = undefined;
    this.payId = '';
    this.tipoPago = TipoPago.EFECTIVO;
  }

  exportExcel() {
    const dataToExport = this.tableFiltered.map((item) => {
      return {
        NRO: '#' + item.nroPedido,
        CLIENTE: item.cliente.nombre,
        DESCRIPCION: item.descripcion,
        SERVICIO: Utils.capitalize(item.tipo),
        MONTO: item.monto,
        'FECHA CREACION': Utils.formatDate(item.fecha),
        ESTADO: Utils.capitalize(item.estado),
        'TIPO PAGO': item.fechaPago ? Utils.capitalize(item.tipoPago) : '-',
        'ESTADO PAGO': Utils.capitalize(item.estadoPago),
        'FECHA PAGO': item.fechaPago ? Utils.formatDate(item.fechaPago) : '-',
      };
    });
    Utils.exportExcel(dataToExport, 'Pedido_Reporte');
  }

  onFilter(e: TableFilterEvent) {
    this.tableFiltered = [...e.filteredValue];
  }

  filterDate(): boolean {
    if (!this.filterStartDate || !this.filterEndDate) return false;
    if (this.filterStartDate < this.filterEndDate) {
      this.dataFiltered = this.pedidos.filter(
        (item) =>
          this.filterStartDate &&
          this.filterEndDate &&
          new Date(item.fecha) >= this.filterStartDate &&
          new Date(item.fecha) <= this.filterEndDate
      );
      this.tableFiltered = [...this.dataFiltered];
    } else if (Utils.sameDate(this.filterStartDate, this.filterEndDate)) {
      this.dataFiltered = this.pedidos.filter(
        (item) =>
          this.filterStartDate &&
          Utils.sameDate(new Date(item.fecha), this.filterStartDate)
      );
      this.tableFiltered = [...this.dataFiltered];
    } else {
      return false
    }
    return true
  }

  filterServicio(data: PedidoEntity[]){
    if (this.filterServicios && this.filterServicios.length > 0) {
      const valuesSet = new Set(
        this.filterServicios.map((item) => String(item.value))
      );
      this.dataFiltered = data.filter((item) =>
        valuesSet.has(item.tipo)
      );
      this.tableFiltered = [...this.dataFiltered];
    } else {
      this.dataFiltered = [...data];
      this.tableFiltered = [...data];
    }
  }

  filterAll() {
    let isFilterDate = this.filterDate()
    if (this.filterServicios == null ) {
      if(isFilterDate) {
        return
      } else {
        this.dataFiltered = [...this.pedidos];
        this.tableFiltered = [...this.pedidos];
        return
      }
    }
    this.filterServicio(isFilterDate ? this.dataFiltered : this.pedidos)
  }

  cleanFilters() {
    this.filterStartDate = undefined;
    this.filterEndDate = undefined;
    this.filterServicios = null;
    this.dataFiltered = [...this.pedidos];
    this.tableFiltered = [...this.pedidos];
  }
}
