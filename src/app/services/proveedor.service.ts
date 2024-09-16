import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any> {
    return this.http.get(this.url + '/proveedores',this.headers);
  }

  addProveedor(proveedor: any): Observable<any> {
    return this.http.post(this.url + '/proveedores', proveedor, this.headers);
  }

}
