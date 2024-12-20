import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { ClientService } from '../../services/cliente.service';
import { ClientModel } from '../../entities/cliente/cliente.model';
import { ClientEntity } from '../../entities/cliente/cliente.entity';

const emptyModel: ClientModel = {
  name: '',
  ruc: null,
  company: '',
  address: null,
  phone: '',
  email: null,
};

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  client: ClientModel = { ...emptyModel };
  clients: ClientEntity[] = [];
  dataFilter: ClientEntity[] = [];
  search: string = '';
  updateId: string = '';
  dialog: boolean = false;

  constructor(
    private readonly clientService: ClientService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.get().subscribe({
      next: (data) => {
        this.clients = data;
        this.dataFilter = data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addClient(): void {
    this.client.ruc = this.client.ruc == '' ? null : this.client.ruc;
    this.client.address = this.client.address == '' ? null : this.client.address;
    this.client.email = this.client.email == '' ? null : this.client.email;
    this.client.phone = this.client.phone == '' ? null : this.client.phone;

    this.clientService.add(this.client).subscribe({
      next: () => {
        this.showDialog(false);
        this.getClients();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateClient(): void {
    this.client.ruc = this.client.ruc == '' ? null : this.client.ruc;
    this.client.address = this.client.address == '' ? null : this.client.address;
    this.client.email = this.client.email == '' ? null : this.client.email;
    this.client.phone = this.client.phone == '' ? null : this.client.phone;

    this.clientService.update(this.client, this.updateId).subscribe({
      next: () => {
        this.showDialog(false);
        this.getClients();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterData(): void {
    this.dataFilter = this.clients.filter(
      (item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase()) ||
        item.company.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  showUpdateDialog(client: ClientEntity): void {
    this.updateId = client.id;
    this.client = { ...client };
    this.showDialog(true);
  }

  showDialog(visible: boolean): void {
    this.dialog = visible;
  }

  hideDialog(): void {
    this.client = { ...emptyModel };
    this.updateId = '';
  }
}
