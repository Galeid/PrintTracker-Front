import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { GastoService } from '../../services/gasto.service';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { ProveedorEntity } from '../../entities/proveedor/proveedor.entity';
import { GastoModel } from '../../entities/gasto/gasto.model';
import { TipoPago } from '../../entities/enums/pedido.enums';
import { GastoEntity } from '../../entities/gasto/gasto.entity';

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
  gasto: GastoModel = model;
  gastos: GastoEntity[] = [];
  dialog: boolean = false;
  dataFiltered: GastoEntity[] = [];
  proveedorSelected: ProveedorEntity | undefined;
  proveedores: ProveedorEntity[] = [];
  proveedoresFiltered: ProveedorEntity[] = [];
  pagoOptions = pagoOptions;

  constructor(
    private gastoService: GastoService,
    private proveedorService: ProveedorService,
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
    this.gastoService.get().subscribe({
      next: (data) => {
        (this.gastos = [...data]), (this.dataFiltered = [...data]);
      },
      error: (error) => console.error('Error:', error),
    });
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
    let filtered: ProveedorEntity[] = [];
    let query = event.query;

    for (let i = 0; i < this.proveedores.length; i++) {
      let proveedor = this.proveedores[i];
      if (proveedor.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(proveedor);
      }
    }
    this.proveedoresFiltered = filtered;
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.gasto = model;
    this.proveedorSelected = undefined;
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
