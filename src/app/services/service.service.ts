import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceEntity } from '../entities/service/service.entity';
import { ServiceModel } from '../entities/service/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<ServiceEntity[]> {
    return this.http.get<ServiceEntity[]>(this.url + '/services', this.options);
  }

  add(model: ServiceModel): Observable<ServiceEntity> {
    return this.http.post<ServiceEntity>(
      this.url + '/services',
      model,
      this.options
    );
  }

  update(model: ServiceModel, id: string): Observable<ServiceEntity> {
    return this.http.patch<ServiceEntity>(
      this.url + '/services/' + id,
      model,
      this.options
    );
  }
}
