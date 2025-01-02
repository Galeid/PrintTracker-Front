import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderEntity } from '../entities/pedido/pedido.entity';
import { PedidoModel } from '../entities/pedido/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  get(): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.url + '/pedidos',this.headers);
  }

  getByCliente(id:string): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(this.url + '/pedidos/cliente/' + id,this.headers);
  }

  add(model: PedidoModel): Observable<OrderEntity> {
    return this.http.post<OrderEntity>(this.url + '/pedidos', model, this.headers);
  }

  pay(id: string): Observable<OrderEntity> {
    return this.http.patch<OrderEntity>(this.url + '/pedidos/pagar/' + id, this.headers);
  }

  cancel(id: string): Observable<OrderEntity> {
    return this.http.delete<OrderEntity>(this.url + '/pedidos/' + id, this.headers);
  }
}
