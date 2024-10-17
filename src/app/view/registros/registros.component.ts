import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [TableModule],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css',
})
export class RegistrosComponent implements OnInit {
  registros = [];
  constructor(
    public router: Router,

    private registroService: RegistroService
  ) {}
  ngOnInit(): void {
    this.registroService.getRegistros().subscribe({
      next: (data) => {
        this.registros = data;
        console.log(data);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  formatDate(dateToFormat: Date): string {
    const date = new Date(dateToFormat);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear().toString().slice(0);
    return `${dia}/${mes}/${anio}`;
  }
}
