import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProveedorEntity } from '../entities/proveedor/proveedor.entity';
import { ProveedorModel } from '../entities/proveedor/proveedor.model';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<ProveedorEntity[]> {
    return this.http.get<ProveedorEntity[]>(
      this.url + '/proveedores',
      this.headers
    );
  }

  add(model: ProveedorModel): Observable<ProveedorEntity> {
    return this.http.post<ProveedorEntity>(
      this.url + '/proveedores',
      model,
      this.headers
    );
  }
}
