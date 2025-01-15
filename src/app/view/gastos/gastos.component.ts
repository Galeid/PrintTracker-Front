import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

import { ExpenseService } from '../../services/gasto.service';
import { SupplierService } from '../../services/proveedor.service';
import { SupplierEntity } from '../../entities/proveedor/supplier.entity';
import { ExpenseModel } from '../../entities/gasto/gasto.model';
import { TipoPago } from '../../entities/enums/pedido.enums';
import { ExpenseEntity } from '../../entities/gasto/gasto.entity';
import { Utils } from '../../utils/utils';
import { CheckboxModule } from 'primeng/checkbox';

const model: ExpenseModel = {
  description: '',
  amount: 0,
  noInvoice: '',
  date: new Date(),
  secondary: false,
  supplierId: ''
};

const pagoOptions = [
  { value: TipoPago.EFECTIVO, label: 'Efectivo' },
  { value: TipoPago.YAPE, label: 'Yape' },
  { value: TipoPago.TRANSFERENCIA, label: 'Transferencia' },
];

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    AutoCompleteModule,
    CheckboxModule,
  ],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css',
})
export class GastosComponent implements OnInit {
  expense: ExpenseModel = { ...model };
  expenses: ExpenseEntity[] = [];
  dialog: boolean = false;
  filteredData: ExpenseEntity[] = [];

  selectedSuplier: SupplierEntity | undefined;
  suppliers: SupplierEntity[] = [];
  filteredSuppliers: SupplierEntity[] = [];

  @Input() supplierId: string | undefined;

  filterStartDate: Date | undefined;
  filterEndDate: Date | undefined;

  protected readonly Utils = Utils;

  constructor(
    private expenseService: ExpenseService,
    private supplierService: SupplierService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getExpenses();
    this.getSuppliers();
  }

  getExpenses(): void {
    if (this.supplierId) {
      this.expenseService.getBySupplier(this.supplierId).subscribe({
        next: (data) => {
          this.expenses = [...data];
          this.filteredData = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    } else {
      this.expenseService.get().subscribe({
        next: (data) => {
          this.expenses = [...data]
          this.filteredData = [...data];
        },
        error: (error) => console.error('Error:', error),
      });
    }
  }

  getSuppliers() {
    this.supplierService.get().subscribe({
      next: (data) => {
        this.suppliers = [...data];
        this.filteredSuppliers = [...data];
      },
      error: (error) => console.error('Error:', error),
    });
  }

  addExpense() {
    let lockDate = localStorage.getItem('lockDate');
    if (lockDate == null) return;
    if (!this.selectedSuplier ) return;
    if (new Date(this.expense.date).getTime() <= +lockDate) return;

    if (this.expense.noInvoice === '') this.expense.noInvoice = undefined;

    this.expense.supplierId = this.selectedSuplier.id;

    this.expenseService.add(this.expense).subscribe({
      next: () => {
        this.showDialog(false)
        this.getExpenses();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  cancelExpense(expense: ExpenseEntity) {}

  filterSupplierAC(event: AutoCompleteCompleteEvent) {
    let filtered: SupplierEntity[] = [];
    let query = event.query;

    for (let i = 0; i < this.suppliers.length; i++) {
      let supplier = this.suppliers[i];
      if (supplier.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(supplier);
      }
    }
    this.filteredSuppliers = filtered;
  }

  getSupplierById(id: string): SupplierEntity | undefined {
    return this.suppliers.find((supplier) => supplier.id === id);
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.expense = { ...model, date: new Date() };
    this.selectedSuplier = undefined;
  }











  filterDate(): boolean {
    if (!this.filterStartDate || !this.filterEndDate) return false;
    if (this.filterStartDate < this.filterEndDate) {
      this.filteredData = this.expenses.filter(
        (item) =>
          this.filterStartDate &&
          this.filterEndDate &&
          new Date(item.date) >= this.filterStartDate &&
          new Date(item.date) <= this.filterEndDate
      );
    } else if (Utils.sameDate(this.filterStartDate, this.filterEndDate)) {
      this.filteredData = this.expenses.filter(
        (item) =>
          this.filterStartDate &&
          Utils.sameDate(new Date(item.date), this.filterStartDate)
      );
    }else {
      return false;
    }
    return true
  }

  cleanFilters() {
    this.filterStartDate = undefined;
    this.filterEndDate = undefined;
    this.filteredData = [...this.expenses];
  }

   // exportExcel() {
  //   const dataToExport = this.dataFiltered.map((item) => {
  //     return {
  //       PROVEEDOR: item.proveedor.name,
  //       DESCRIPCION: item.descripcion,
  //       RUBRO: item.proveedor.category
  //         ? Utils.capitalize(item.proveedor.category)
  //         : '-',
  //       MONTO: item.monto,
  //       'FECHA CREACION': Utils.formatDate(item.fecha),
  //       'TIPO PAGO': item.tipoPago ? Utils.capitalize(item.tipoPago) : '-',
  //     };
  //   });
  //   Utils.exportExcel(dataToExport, 'Gasto_Reporte');
  // }
}
