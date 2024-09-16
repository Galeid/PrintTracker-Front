import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [TableModule,InputTextModule,DialogModule,CommonModule,FormsModule, ButtonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent implements OnInit {
  clientes = [];
  displayDialog = false;
  cliente:any = {
    nombre:'',
    ruc:'',
    empresa:'',
    direccion:'',
    telefono:'',
    correo:''
  };

  constructor(private clienteService: ClienteService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getClientes()
  }

  showDialog() {
    this.displayDialog = true;
  }

  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log(clientes);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addCliente() {
    this.clienteService.addCliente(this.cliente).subscribe({
      next: () => {
        console.log('Cliente agregado correctamente');
        this.displayDialog = false
        this.cliente= {
          nombre:'',
          ruc:'',
          empresa:'',
          telefono:'',
          direccion:'',
          correo:''
        }
        this.getClientes()
      },
      error: (error) => {
        console.error('Error:', error);
      },
    })
  }
}
