import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PedidoEntity } from '../entities/pedido/pedido.entity';
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

  get(): Observable<PedidoEntity[]> {
    return this.http.get<PedidoEntity[]>(this.url + '/pedidos',this.headers);
  }

  getByCliente(id:string): Observable<PedidoEntity[]> {
    return this.http.get<PedidoEntity[]>(this.url + '/pedidos/cliente/' + id,this.headers);
  }

  add(model: PedidoModel): Observable<PedidoEntity> {
    return this.http.post<PedidoEntity>(this.url + '/pedidos', model, this.headers);
  }

  pay(id: string): Observable<PedidoEntity> {
    return this.http.get<PedidoEntity>(this.url + '/pedidos/pagar/' + id, this.headers);
  }
}
