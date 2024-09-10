import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }
cajaId='8186798b-a60f-46a3-9caa-31703750b83a'
  constructor(private http: HttpClient) {}

  getCaja(): Observable<any> {
    return this.http.get(this.url + '/caja/' + this.cajaId,this.headers);
  }

  cerrarCaja(registrodto:any): Observable<any> {
    return this.http.post(this.url+'/registros/',registrodto,this.headers)
  }
}
