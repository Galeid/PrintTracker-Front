import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { Utils } from '../../utils/utils';

import { SupplierService } from '../../services/proveedor.service';
import { SupplierModel } from '../../entities/proveedor/supplier.model';
import { SupplierEntity } from '../../entities/proveedor/supplier.entity';

const emptyModel: SupplierModel = {
  name: '',
  ruc: null,
  company: null,
  category: null,
};

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css',
})
export class SuppliersComponent implements OnInit {
  supplier: SupplierModel = { ...emptyModel };
  suppliers: SupplierEntity[] = [];
  filteredData: SupplierEntity[] = [];
  categories: string[] = [];
  filteredCategories: string[] = [];
  search: string = '';
  updateId: string = '';
  dialog: boolean = false;

  protected readonly Utils = Utils;

  constructor(
    private readonly supplierService: SupplierService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): void {
    this.supplierService.get().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.filteredData = data;
        this.categories = data
          .map((item) => item.category)
          .filter((value, index, self) => self.indexOf(value) === index);
      },
      error: (error) => console.error('Error:', error),
    });
  }

  addSupplier() {
    this.supplier.ruc = this.supplier.ruc == '' ? null : this.supplier.ruc;
    this.supplier.company = this.supplier.company == '' ? null : this.supplier.company;
    this.supplier.category = this.supplier.category == '' ? null : this.supplier.category;
    if (this.supplier.category)
      this.supplier.category = Utils.capitalize(this.supplier.category);

    this.supplierService.add(this.supplier).subscribe({
      next: () => {
        this.showDialog(false);
        this.getSuppliers();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateSupplier() {
    this.supplier.ruc = this.supplier.ruc == '' ? null : this.supplier.ruc;
    this.supplier.company = this.supplier.company == '' ? null : this.supplier.company;
    this.supplier.category = this.supplier.category == '' ? null : this.supplier.category;
    if (this.supplier.category)
      this.supplier.category = Utils.capitalize(this.supplier.category);

    this.supplierService.update(this.supplier, this.updateId).subscribe({
      next: () => {
        this.showDialog(false);
        this.getSuppliers();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterData() {
    this.filteredData = this.suppliers.filter(
      (item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase()) ||
        (item.company &&
          item.company.toLowerCase().includes(this.search.toLowerCase()))
    );
  }

  filterCategory(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let i = 0; i < this.categories.length; i++) {
      let category = this.categories[i];
      if (category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(category);
      }
    }
    this.filteredCategories = filtered;
  }

  showUpdateDialog(supplier: SupplierEntity) {
    this.updateId = supplier.id;
    this.supplier = { ...supplier };
    this.showDialog(true);
  }

  showDialog(visible: boolean) {
    this.dialog = visible;
  }

  hideDialog() {
    this.supplier = { ...emptyModel };
    this.updateId = '';
  }
}
