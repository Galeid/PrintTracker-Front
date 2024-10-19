import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroEntity } from '../entities/registro/registro.entity';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  url = 'http://localhost:3000';
  headers = {
    headers: { Accept: 'application/json' },
  }

  constructor(private http: HttpClient) {}

  get(): Observable<RegistroEntity[]> {
    return this.http.get<RegistroEntity[]>(this.url + '/registros',this.headers);
  }

}
