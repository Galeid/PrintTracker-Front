import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GastoModel } from '../entities/gasto/gasto.model';
import { GastoEntity } from '../entities/gasto/gasto.entity';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  get(): Observable<GastoEntity[]> {
    return this.http.get<GastoEntity[]>(this.url + '/gastos',this.headers);
  }

  add(model: GastoModel): Observable<GastoEntity> {
    return this.http.post<GastoEntity>(this.url + '/gastos', model, this.headers);
  }

}
