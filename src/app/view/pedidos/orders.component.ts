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
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';

import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/cliente.service';
import { ClientEntity } from '../../entities/cliente/cliente.entity';
import { OrderEntity } from '../../entities/pedido/pedido.entity';
import { OrderModel } from '../../entities/pedido/pedido.model';
import {
  EstadoPedido,
  TipoPago,
  TipoPedido,
} from '../../entities/enums/pedido.enums';
import { Utils } from '../../utils/utils';
import { ServiceService } from '../../services/service.service';
import { ServiceEntity } from '../../entities/service/service.entity';
import { OrderPaymentModel } from '../../entities/pedido/orderPayment.model';

const model: OrderModel = {
  description: '',
  amount: 0,
  date: new Date(),
  serviceId: '',
  clientId: '',
};

const paymentModel: OrderPaymentModel = {
  orderId: '',
  orderDate: new Date(),
  paymentDate: new Date(),
  secondary: false,
};

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    FormsModule,
    TagModule,
    ButtonModule,
    InputNumberModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    CheckboxModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  order: OrderModel = { ...model };
  orders: OrderEntity[] = [];
  dialog: boolean = false;
  paymentDialog: boolean = false;
  filteredData: OrderEntity[] = [];
  tableFiltered: OrderEntity[] = [];

  services: ServiceEntity[] = [];
  selectedService: ServiceEntity | undefined;
  filteredServices: ServiceEntity[] = [];

  clients: ClientEntity[] = [];
  selectedClient: ClientEntity | undefined;
  filteredClients: ClientEntity[] = [];

  orderPayment: OrderPaymentModel = { ...paymentModel };

  @Input() clientId: string | undefined;











  //@ViewChild('table') table!: ElementRef;

  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;

  filterServicios: any[] | null = null;

  protected readonly Utils = Utils;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private serviceService: ServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.getClients();
    this.getServices();
  }

  getOrders(): void {
    if (this.clientId) {
      this.orderService.getByClient(this.clientId).subscribe({
        next: (data) => {
          this.orders = [...data];
          this.filteredData = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    } else {
      this.orderService.get().subscribe({
        next: (data) => {
          this.orders = [...data];
          this.filteredData = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    }
  }

  getClients() {
    this.clientService.get().subscribe({
      next: (data) => {
        this.clients = [...data];
        this.filteredClients = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getServices() {
    this.serviceService.get().subscribe({
      next: (data) => {
        this.services = [...data];
        this.filteredServices = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  addOrder() {
    let lockDate = localStorage.getItem('lockDate');
    if (lockDate == null) return;
    if (!this.selectedClient || !this.selectedService) return;
    if (new Date(this.order.date).getTime() <= +lockDate) return;

    this.order.clientId = this.selectedClient.id || '';
    this.order.serviceId = this.selectedService.id || '';
    console.log(this.order);

    this.orderService.add(this.order).subscribe({
      next: () => {
        this.showDialog(false);
        this.getOrders();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  payOrder() {
    let lockDate = localStorage.getItem('lockDate');
    if (lockDate == null) return;
    if (new Date(this.orderPayment.paymentDate).getTime() <= +lockDate) return;
    if (new Date(this.orderPayment.paymentDate).getTime() < new Date(this.orderPayment.orderDate).getTime()) return;

    this.orderService.pay(this.orderPayment).subscribe({
      next: () => {
        this.showPayDialog(false);
        this.getOrders();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  cancelOrder(id: string) {
    this.orderService.cancel(id).subscribe({
      next: () => {
        this.getOrders();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterClient(event: AutoCompleteCompleteEvent) {
    let filtered: ClientEntity[] = [];
    let query = event.query;
    for (let i = 0; i < this.clients.length; i++) {
      let client = this.clients[i];
      if (client.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(client);
      }
    }
    this.filteredClients = filtered;
  }

  filterService(event: AutoCompleteCompleteEvent) {
    let filtered: ServiceEntity[] = [];
    let query = event.query;
    for (let i = 0; i < this.services.length; i++) {
      let service = this.services[i];
      if (service.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(service);
      }
    }
    this.filteredServices = filtered;
  }

  getClienteById(id: string): ClientEntity | undefined {
    return this.clients.find((cliente) => cliente.id === id);
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  showPayDialog(visible: boolean, order?: OrderEntity) {
    if (order) {
      this.orderPayment = {
        ...this.orderPayment,
        orderId: order.id,
        orderDate: new Date(order.date),
      };
    }
    this.paymentDialog = visible;
  }

  hideDialog() {
    this.order = { ...model, date: new Date() };
    this.orderPayment = { ...paymentModel, paymentDate: new Date() };
    this.selectedClient = undefined;
    this.selectedService = undefined;
  }

















  // exportExcel() {
  //   const dataToExport = this.tableFiltered.map((item) => {
  //     return {
  //       NRO: '#' + item.nroPedido,
  //       CLIENTE: item.cliente.name,
  //       DESCRIPCION: item.descripcion,
  //       SERVICIO: Utils.capitalize(item.tipo),
  //       MONTO: item.monto,
  //       'FECHA CREACION': Utils.formatDate(item.fecha),
  //       'ESTADO PAGO': Utils.capitalize(item.estadoPago),
  //       'FECHA PAGO': item.fechaPago ? Utils.formatDate(item.fechaPago) : '-',
  //     };
  //   });
  //   Utils.exportExcel(dataToExport, 'Pedido_Reporte');
  // }

  onFilter(e: TableFilterEvent) {
    this.tableFiltered = [...e.filteredValue];
  }

  filterDate(): boolean {
    if (!this.filterStartDate || !this.filterEndDate) return false;
    if (this.filterStartDate < this.filterEndDate) {
      this.filteredData = this.orders.filter(
        (item) =>
          this.filterStartDate &&
          this.filterEndDate &&
          new Date(item.date) >= this.filterStartDate &&
          new Date(item.date) <= this.filterEndDate
      );
      this.tableFiltered = [...this.filteredData];
    } else if (Utils.sameDate(this.filterStartDate, this.filterEndDate)) {
      this.filteredData = this.orders.filter(
        (item) =>
          this.filterStartDate &&
          Utils.sameDate(new Date(item.date), this.filterStartDate)
      );
      this.tableFiltered = [...this.filteredData];
    } else {
      return false;
    }
    return true;
  }

  // filterServicio(data: OrderEntity[]) {
  //   if (this.filterServicios && this.filterServicios.length > 0) {
  //     const valuesSet = new Set(
  //       this.filterServicios.map((item) => String(item.value))
  //     );
  //     this.filteredData = data.filter((item) => valuesSet.has(item.tipo));
  //     this.tableFiltered = [...this.filteredData];
  //   } else {
  //     this.filteredData = [...data];
  //     this.tableFiltered = [...data];
  //   }
  // }

  filterAll() {
    let isFilterDate = this.filterDate();
    if (this.filterServicios == null) {
      if (isFilterDate) {
        return;
      } else {
        this.filteredData = [...this.orders];
        this.tableFiltered = [...this.orders];
        return;
      }
    }
    //this.filterServicio(isFilterDate ? this.filteredData : this.orders);
  }

  cleanFilters() {
    this.filterStartDate = undefined;
    this.filterEndDate = undefined;
    this.filterServicios = null;
    this.filteredData = [...this.orders];
    this.tableFiltered = [...this.orders];
  }

  getTagEstado(
    estado: EstadoPedido
  ):
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'secondary'
    | 'contrast'
    | undefined {
    switch (estado) {
      case EstadoPedido.COMPLETADO:
        return 'success';
      case EstadoPedido.ANULADO:
        return 'danger';
      case EstadoPedido.PENDIENTE:
        return 'warning';
      case EstadoPedido.PROCESO:
        return 'info';
      default:
        return undefined;
    }
  }
}
