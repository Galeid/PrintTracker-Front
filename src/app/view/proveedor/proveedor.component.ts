import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProveedorService } from '../../services/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css',
})
export class ProveedorComponent implements OnInit {
  proveedores = [];
  displayDialog = false;
  proveedor: any = {
    nombre: '',
    ruc: '',
    empresa: '',
    rubro: '',
  };

  constructor(private proveedorService: ProveedorService,public router: Router) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  showDialog() {
    this.displayDialog = true;
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores) => (this.proveedores = proveedores),
      error: (error) => console.error('Error:', error),
    });
  }

  addProveedor(){
    this.proveedorService.addProveedor(this.proveedor).subscribe({
      next: () => {
        console.log('Cliente agregado correctamente');
        this.displayDialog = false;
        this.proveedor = {
          nombre: '',
          ruc: '',
          empresa: '',
          rubro: '',
        };
        this.getProveedores();
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
