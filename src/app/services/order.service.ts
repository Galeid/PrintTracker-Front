import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderEntity } from '../entities/pedido/pedido.entity';
import { OrderModel } from '../entities/pedido/pedido.model';
import { OrderPaymentModel } from '../entities/pedido/orderPayment.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.url + '/orders',this.options);
  }

  getByClient(id:string): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.url + '/orders/client/' + id,this.options);
  }

  add(model: OrderModel): Observable<OrderEntity> {
    return this.http.post<OrderEntity>(this.url + '/orders', model, this.options);
  }

  pay(model: OrderPaymentModel): Observable<OrderEntity> {
    return this.http.patch<OrderEntity>(this.url + '/orders/pay/', model, this.options);
  }

  cancel(id: string): Observable<OrderEntity> {
    return this.http.delete<OrderEntity>(this.url + '/orders/' + id, this.options);
  }
}
