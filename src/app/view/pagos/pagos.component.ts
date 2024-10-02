import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
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

@Component({
  selector: 'app-pagos',
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
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent implements OnInit {
  displayDialog=false;
  proveedores:ProveedorEntity[]=[]
  gastos: any[] = [];
  gasto: any = {
    descripcion: '',
    monto: 0,
    nroFactura: null,
    tipoPago: 'efectivo',
    fecha: new Date(),
    idUsuario: '',
    idProveedor: '',
    idCaja: '',
  };
  tipoPago = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'yape', label: 'Yape' },
    { value: 'transferencia', label: 'Transferencia' },
  ];
  filteredProveedores: any[] = [];
  proveedorSelected:any

  constructor(private gastoService: GastoService, public router: Router, private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.getGastos();
    this.getProveedores();
  }

  getProveedores() {
    this.proveedorService.get().subscribe({
      next: (proveedores) => (this.proveedores = proveedores),
      error: (error) => console.error('Error:', error),
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  getGastos(): void {
    this.gastoService.getGastos().subscribe({
      next: (gastos) => (this.gastos = gastos),
      error: (error) => console.error('Error:', error),
    });
  }

  filterProveedor(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.proveedores as any[]).length; i++) {
        let proveedor = (this.proveedores as any[])[i];
        if (proveedor.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(proveedor);
        }
    }
    this.filteredProveedores = filtered;
  }

  addGasto() {
    this.gasto.idProveedor = this.proveedorSelected.id;
    this.gasto.idUsuario = localStorage.getItem('idUsuario');
    this.gastoService.addGasto(this.gasto).subscribe({
      next: () => {
        console.log('Cliente agregado correctamente');
        this.displayDialog = false;
        this.gasto = {
          descripcion: '',
          monto: 0,
          nroFactura: null,
          tipoPago: 'efectivo',
          fecha: new Date(),
          idUsuario: '',
          idProveedor: '',
          idCaja: '',
        };
        this.proveedorSelected = undefined
        this.getGastos();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  anularGasto(pedido:any) {

  }

  isToday(fecha:Date) {
    return new Date(fecha).getDate() === new Date().getDate()
  }
}
