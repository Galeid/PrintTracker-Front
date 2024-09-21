import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CajaService } from '../../services/caja.service';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DialogModule, CalendarModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  caja: any;
  displayDialog: boolean = false;
  fechaCerraCaja: Date = new Date();
  constructor(
    public router: Router,
    private readonly cajaService: CajaService
  ) {}
  ngOnInit(): void {
    this.cajaService.getCaja().subscribe({
      next: (caja) => (this.caja = caja),
      error: (error) => console.error('Error:', error),
    });
  }
  cerrarCaja(): void {
    this.cajaService
      .cerrarCaja({
        fecha: this.fechaCerraCaja,
        idUsuario: localStorage.getItem('idUsuario'),
      })
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('Cerrado con éxito');
            console.log(response);
            this.displayDialog = false;
          }
        },
        error: (error) => console.error('Error:', error),
      });
  }
  showDialog() {
    this.displayDialog = true;
  }
}
