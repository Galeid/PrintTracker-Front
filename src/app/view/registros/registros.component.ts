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
}
