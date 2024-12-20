import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientEntity } from '../entities/cliente/cliente.entity';
import { ClientModel } from '../entities/cliente/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<ClientEntity[]> {
    return this.http.get<ClientEntity[]>(this.url + '/clients', this.options);
  }

  add(model: ClientModel): Observable<ClientEntity> {
    return this.http.post<ClientEntity>(
      this.url + '/clients',
      model,
      this.options
    );
  }

  update(model: ClientModel, id: string): Observable<ClientEntity> {
    return this.http.patch<ClientEntity>(
      this.url + '/clients/' + id,
      model,
      this.options
    );
  }
}
