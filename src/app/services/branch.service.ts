import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BranchEntity } from '../entities/branch/branch.entity';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<BranchEntity[]> {
    return this.http.get<BranchEntity[]>(this.url + '/branches', this.options);
  }
}
