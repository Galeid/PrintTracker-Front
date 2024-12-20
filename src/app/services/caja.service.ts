import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CashEntity } from '../entities/cash/cash.entity';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  getByBranch(): Observable<CashEntity> {
    return this.http.get<CashEntity>(this.url + '/cashes/branch', this.options);
  }
}
