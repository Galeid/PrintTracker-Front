import { Component } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { Utils } from '../../utils/utils';
import { BranchService } from '../../services/branch.service';
import { BranchEntity } from '../../entities/branch/branch.entity';
import { ServiceModel } from '../../entities/service/service.model';
import { ServiceEntity } from '../../entities/service/service.entity';
import { ServiceService } from '../../services/service.service';

const emptyModel: ServiceModel = {
  name: '',
};

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
        CommonModule,
        DropdownModule,
        DialogModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  service: ServiceModel = { ...emptyModel };
  services: ServiceEntity[] = [];
  dataFilter: ServiceEntity[] = [];
  search: string = '';
  updateId: string = '';
  dialog: boolean = false;

  protected readonly Utils = Utils;

  constructor(
    private readonly serviceService: ServiceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.serviceService.get().subscribe({
      next: (data) => {
        this.services = data;
        this.dataFilter = data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addService(): void {
    if (this.service.name == '') return;

    this.serviceService.add(this.service).subscribe({
      next: () => {
        this.showDialog(false);
        this.getServices();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateService(): void {
    if (this.service.name == '') return;

    this.serviceService.update(this.service, this.updateId).subscribe({
      next: () => {
        this.showDialog(false);
        this.getServices();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  filterData(): void {
    this.dataFilter = this.services.filter(
      (item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  showUpdateDialog(service: ServiceEntity): void {
    this.updateId = service.id;
    this.service = { ...service };
    this.showDialog(true);
  }

  showDialog(visible: boolean): void {
    this.dialog = visible;
  }

  hideDialog(): void {
    this.service = { ...emptyModel };
    this.updateId = '';
  }
}
