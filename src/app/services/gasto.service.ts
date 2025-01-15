import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../entities/gasto/gasto.model';
import { ExpenseEntity } from '../entities/gasto/gasto.entity';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<ExpenseEntity[]> {
    return this.http.get<ExpenseEntity[]>(this.url + '/expenses',this.options);
  }

  getBySupplier(id:string): Observable<ExpenseEntity[]> {
    return this.http.get<ExpenseEntity[]>(this.url + '/expenses/supplier/' + id,this.options);
  }

  add(model: ExpenseModel): Observable<ExpenseEntity> {
    return this.http.post<ExpenseEntity>(this.url + '/expenses', model, this.options);
  }

}
