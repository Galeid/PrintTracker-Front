import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

import { GastoService } from '../../services/gasto.service';
import { SupplierService } from '../../services/proveedor.service';
import { SupplierEntity } from '../../entities/proveedor/supplier.entity';
import { GastoModel } from '../../entities/gasto/gasto.model';
import { TipoPago } from '../../entities/enums/pedido.enums';
import { GastoEntity } from '../../entities/gasto/gasto.entity';
import { Utils } from '../../utils/utils';

const model: GastoModel = {
  descripcion: '',
  monto: 0,
  nroFactura: '',
  tipoPago: TipoPago.EFECTIVO,
  fecha: new Date(),
  idUsuario: '',
  idProveedor: '',
  idCaja: '',
};

const pagoOptions = [
  { value: TipoPago.EFECTIVO, label: 'Efectivo' },
  { value: TipoPago.YAPE, label: 'Yape' },
  { value: TipoPago.TRANSFERENCIA, label: 'Transferencia' },
];

@Component({
  selector: 'app-gastos',
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
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css',
})
export class GastosComponent implements OnInit {
  gasto: GastoModel = { ...model };
  gastos: GastoEntity[] = [];
  dialog: boolean = false;
  dataFiltered: GastoEntity[] = [];
  proveedorSelected: SupplierEntity | undefined;
  proveedores: SupplierEntity[] = [];
  proveedoresFiltered: SupplierEntity[] = [];
  pagoOptions = pagoOptions;
  @Input() proveedorId: string | undefined;

  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;

  protected readonly Utils = Utils;

  constructor(
    private gastoService: GastoService,
    private proveedorService: SupplierService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getGastos();
    this.getProveedores();
  }

  getProveedores() {
    this.proveedorService.get().subscribe({
      next: (data) => {
        this.proveedores = [...data];
        this.proveedoresFiltered = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getGastos(): void {
    if (this.proveedorId) {
      this.gastoService.getByProveedor(this.proveedorId).subscribe({
        next: (data) => {
          this.gastos = [...data];
          this.dataFiltered = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    } else {
      this.gastoService.get().subscribe({
        next: (data) => {
          (this.gastos = [...data]), (this.dataFiltered = [...data]);
        },
        error: (error) => console.error('Error:', error),
      });
    }
  }

  addGasto() {
    this.gasto.idProveedor = this.proveedorSelected?.id || '';
    this.gasto.idUsuario = localStorage.getItem('idUsuario') || '';
    this.gastoService.add(this.gasto).subscribe({
      next: () => {
        this.dialog = false;
        this.getGastos();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  cancelGasto(pedido: any) {}

  filterProveedor(event: AutoCompleteCompleteEvent) {
    let filtered: SupplierEntity[] = [];
    let query = event.query;

    for (let i = 0; i < this.proveedores.length; i++) {
      let proveedor = this.proveedores[i];
      if (proveedor.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(proveedor);
      }
    }
    this.proveedoresFiltered = filtered;
  }

  getProveedorById(id: string): SupplierEntity | undefined {
    return this.proveedores.find((proveedor) => proveedor.id === id);
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.gasto = { ...model, fecha: new Date() };
    this.proveedorSelected = undefined;
  }

  exportExcel() {
    const dataToExport = this.dataFiltered.map((item) => {
      return {
        PROVEEDOR: item.proveedor.name,
        DESCRIPCION: item.descripcion,
        RUBRO: item.proveedor.category
          ? Utils.capitalize(item.proveedor.category)
          : '-',
        MONTO: item.monto,
        'FECHA CREACION': Utils.formatDate(item.fecha),
        'TIPO PAGO': item.tipoPago ? Utils.capitalize(item.tipoPago) : '-',
      };
    });
    Utils.exportExcel(dataToExport, 'Gasto_Reporte');
  }

  filterDate() {
    if (!this.filterStartDate || !this.filterEndDate) return;
    if (this.filterStartDate < this.filterEndDate) {
      this.dataFiltered = this.gastos.filter(
        (item) =>
          this.filterStartDate &&
          this.filterEndDate &&
          new Date(item.fecha) >= this.filterStartDate &&
          new Date(item.fecha) <= this.filterEndDate
      );
    } else if (Utils.sameDate(this.filterStartDate, this.filterEndDate)) {
      this.dataFiltered = this.gastos.filter(
        (item) =>
          this.filterStartDate &&
          Utils.sameDate(new Date(item.fecha), this.filterStartDate)
      );
    }
  }

  cleanFilterDate() {
    this.filterStartDate = undefined;
    this.filterEndDate = undefined;
    this.dataFiltered = [...this.gastos];
  }
}
