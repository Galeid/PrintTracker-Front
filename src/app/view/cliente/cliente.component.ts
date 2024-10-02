import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ClienteService } from '../../services/cliente.service';
import { ClienteModel } from '../../entities/cliente/cliente.model';
import { ClienteEntity } from '../../entities/cliente/cliente.entity';

const model: ClienteModel = {
  nombre: '',
  ruc: '',
  empresa: '',
  direccion: '',
  telefono: '',
  correo: '',
};

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent implements OnInit {
  cliente: ClienteModel = model;
  clientes: ClienteEntity[] = [];
  dialog: boolean = false;
  search: string = '';
  dataFiltered: ClienteEntity[] = [];

  constructor(private clienteService: ClienteService, public router: Router) {}

  ngOnInit(): void {
    this.getClientes();
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.cliente = model;
  }

  getClientes() {
    this.clienteService.get().subscribe({
      next: (data) => {
        this.clientes = data;
        this.dataFiltered = data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addCliente() {
    this.clienteService.add(this.cliente).subscribe({
      next: () => {
        this.dialog = false;
        this.getClientes();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterData() {
    this.dataFiltered = this.clientes.filter(
      (item) =>
        item.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
        item.empresa.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
