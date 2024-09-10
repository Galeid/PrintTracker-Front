import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    return this.http.get(this.url + '/clientes',this.headers);
  }

  addCliente(cliente: any): Observable<any> {
    return this.http.post(this.url + '/clientes', cliente, this.headers);
  }

}
