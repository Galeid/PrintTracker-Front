import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  getGastos(): Observable<any> {
    return this.http.get(this.url + '/gastos',this.headers);
  }

  addGasto(gasto: any): Observable<any> {
    return this.http.post(this.url + '/gastos', gasto, this.headers);
  }

}
