import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<any> {
    return this.http.get(this.url + '/pedidos',this.headers);
  }

  addPedido(pedido: any): Observable<any> {
    return this.http.post(this.url + '/pedidos', pedido, this.headers);
  }

  payPedido(id: string): Observable<any> {
    return this.http.get(this.url + '/pedidos/pagar/' + id, this.headers);
  }

}
