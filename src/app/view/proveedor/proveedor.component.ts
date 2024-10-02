import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ProveedorService } from '../../services/proveedor.service';
import { ProveedorModel } from '../../entities/proveedor/proveedor.model';
import { ProveedorEntity } from '../../entities/proveedor/proveedor.entity';

const model: ProveedorModel = {
  nombre: '',
  ruc: '',
  empresa: '',
  rubro: '',
};

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DialogModule,
    InputIconModule,
    IconFieldModule,
    CommonModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css',
})
export class ProveedorComponent implements OnInit {
  proveedor: ProveedorModel = model;
  proveedores: ProveedorEntity[] = [];
  dialog: boolean = false;
  search: string = '';
  dataFiltered: ProveedorEntity[] = [];

  constructor(
    private proveedorService: ProveedorService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.proveedor = model;
  }

  getProveedores(): void {
    this.proveedorService.get().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.dataFiltered = data;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  addProveedor() {
    this.proveedorService.add(this.proveedor).subscribe({
      next: () => {
        this.dialog = false;
        this.getProveedores();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterData() {
    this.dataFiltered = this.proveedores.filter(
      (item) =>
        item.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
        item.empresa.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
