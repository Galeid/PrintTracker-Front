import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { RegistroService } from '../../services/registro.service';
import { ButtonModule } from 'primeng/button';
import { RegistroEntity } from '../../entities/registro/registro.entity';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css',
})
export class RegistrosComponent implements OnInit {
  registros: RegistroEntity[] = [];
  dataFiltered:RegistroEntity[] = [];

  protected readonly Utils = Utils;

  constructor(
    public router: Router,

    private registroService: RegistroService
  ) {}

  ngOnInit(): void {
    this.registroService.get().subscribe({
      next: (data) => {
        this.registros = [...data];
        this.dataFiltered = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
