import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';

import { CashEntity } from '../../entities/cash/cash.entity';
import { CashService } from '../../services/caja.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DialogModule, CalendarModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  cash: CashEntity | undefined;

  constructor(
    public router: Router,
    private readonly cashService: CashService
  ) {}

  ngOnInit(): void {
    this.getCash();
  }

  getCash(): void {
    this.cashService.getByBranch().subscribe({
      next: (cash) => (this.cash = cash),
      error: (error) => console.error('Error:', error),
    });
  }
}
