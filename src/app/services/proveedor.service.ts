import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SupplierEntity } from '../entities/proveedor/supplier.entity';
import { SupplierModel } from '../entities/proveedor/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<SupplierEntity[]> {
    return this.http.get<SupplierEntity[]>(
      this.url + '/suppliers',
      this.options
    );
  }

  add(model: SupplierModel): Observable<SupplierEntity> {
    return this.http.post<SupplierEntity>(
      this.url + '/suppliers',
      model,
      this.options
    );
  }

  update(model: SupplierModel, id: string): Observable<SupplierEntity> {
    return this.http.patch<SupplierEntity>(
      this.url + '/proveedores/' + id,
      model,
      this.options
    );
  }
}
