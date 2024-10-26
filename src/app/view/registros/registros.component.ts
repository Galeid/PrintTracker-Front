import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { RegistroService } from '../../services/registro.service';
import { ButtonModule } from 'primeng/button';
import { RegistroEntity } from '../../entities/registro/registro.entity';
import { Utils } from '../../utils/utils';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [TableModule, ButtonModule, CalendarModule, FormsModule],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.css',
})
export class RegistrosComponent implements OnInit {
  registros: RegistroEntity[] = [];
  dataFiltered: RegistroEntity[] = [];

  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;

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

  exportExcel() {
    const dataToExport = this.dataFiltered.map((item) => {
      return {
        FECHA: Utils.formatDate(item.fecha),
        'CUENTA INICIAL': item.cuentaInicial,
        'CUENTA FINAL': item.cuentaFinal,
        'EFECTIVO INICIAL': item.efectivoInicial,
        'EFECTIVO FINAL': item.efectivoFinal,
        'PENDIENTE INICIAL': item.pendienteInicial,
        'PENDIENTE FINAL': item.pendienteFinal,
        'INGRESOS CUENTA TOTAL': item.ingresosCuentaTotal,
        'INGRESOS EFECTIVO TOTAL': item.ingresosEfectivoTotal,
        'GASTOS CUENTA TOTAL': item.gastosCuentaTotal,
        'GASTOS EFECTIVO TOTAL': item.gastosEfectivoTotal,
        'PENDIENTES HOY': item.pendientesHoy,
        'PASADOS PAGADOS': item.pasadosPagados,
        'NRO PEDIDOS': item.nroPedidos,
        'NRO GASTOS': item.nroGastos,
        'NRO PEDIDOS PENDIENTES': item.nroPedidosPendientes,
        'NRO PASADOS PAGADOS': item.nroPasadosPagados,
      };
    });
    Utils.exportExcel(dataToExport, 'Registro_Reporte');
  }

  filterDate() {
    if (!this.filterStartDate || !this.filterEndDate) return;
    if (this.filterStartDate < this.filterEndDate) {
      this.dataFiltered = this.registros.filter(
        (item) =>
          this.filterStartDate &&
          this.filterEndDate &&
          new Date(item.fecha) >= this.filterStartDate &&
          new Date(item.fecha) <= this.filterEndDate
      );
    } else if (Utils.sameDate(this.filterStartDate, this.filterEndDate)) {
      this.dataFiltered = this.registros.filter(
        (item) =>
          this.filterStartDate &&
          Utils.sameDate(new Date(item.fecha), this.filterStartDate)
      );
    }
  }

  cleanFilterDate() {
    this.filterStartDate = undefined;
    this.filterEndDate = undefined;
    this.dataFiltered = [...this.registros];
  }
}
