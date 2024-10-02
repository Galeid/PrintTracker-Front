import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClienteEntity } from '../entities/cliente/cliente.entity';
import { ClienteModel } from '../entities/cliente/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<ClienteEntity[]> {
    return this.http.get<ClienteEntity[]>(this.url + '/clientes', this.headers);
  }

  add(model: ClienteModel): Observable<ClienteEntity> {
    return this.http.post<ClienteEntity>(
      this.url + '/clientes',
      model,
      this.headers
    );
  }
}
