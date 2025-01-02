import { Component } from '@angular/core';
import { UserModel, UserRole } from '../../entities/user/user.model';
import { UserEntity } from '../../entities/user/user.entity';
import { UserService } from '../../services/user.service';
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

const emptyModel: UserModel = {
  username: '',
  password: '',
  role: UserRole.REPORT,
  name: null,
  branchId: '',
};

@Component({
  selector: 'app-user',
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
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user: UserModel = { ...emptyModel };
  users: UserEntity[] = [];
  dataFilter: UserEntity[] = [];
  search: string = '';
  updateId: string = '';
  dialog: boolean = false;
  userRoles = [
    { label: 'Reportes', value: UserRole.REPORT },
    { label: 'Administrador', value: UserRole.ADMIN },
    { label: 'Controlador', value: UserRole.CONTROLLER },
  ];
  branches: BranchEntity[] = [];

  protected readonly Utils = Utils;

  constructor(
    private readonly userService: UserService,
    private readonly branchService: BranchService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getBranchs();
  }

  getUsers(): void {
    this.userService.get().subscribe({
      next: (data) => {
        this.users = data;
        this.dataFilter = data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addUser(): void {
    this.user.name = this.user.name == '' ? null : this.user.name;
    if (this.user.password == '') return;

    this.userService.add(this.user).subscribe({
      next: () => {
        this.showDialog(false);
        this.getUsers();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  updateUser(): void {
    this.user.name = this.user.name == '' ? null : this.user.name;

    this.userService.update(this.user, this.updateId).subscribe({
      next: () => {
        this.showDialog(false);
        this.getUsers();
      },
      error: (error) => console.error('Error:', error),
    });
  }

  getBranchs(): void {
    this.branchService.get().subscribe({
      next: (data) => {
        this.branches = data;
        this.user.branchId = data[0].id;
      },
      error: (error) => {
        console.error('Error:', error);
      },
  })
}

  filterData(): void {
    this.dataFilter = this.users.filter(
      (item) =>
        item.username.toLowerCase().includes(this.search.toLowerCase()) ||
        (item.name &&
          item.name.toLowerCase().includes(this.search.toLowerCase()))
    );
  }

  showUpdateDialog(user: UserEntity): void {
    this.updateId = user.id;
    this.user = { ...user, password: '', branchId: user.branch.id };
    this.showDialog(true);
  }

  showDialog(visible: boolean): void {
    this.dialog = visible;
  }

  hideDialog(): void {
    this.user = { ...emptyModel };
    this.updateId = '';
  }
}
