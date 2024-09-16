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
  cajaId='4befa8fe-da33-4f4d-b60f-d29e6e255a0e'
  constructor(private http: HttpClient) {}

  getCaja(): Observable<any> {
    return this.http.get(this.url + '/cajas/' + this.cajaId,this.headers);
  }

  cerrarCaja(registrodto:any): Observable<any> {
    return this.http.post(this.url+'/registros/',registrodto,this.headers)
  }
}
