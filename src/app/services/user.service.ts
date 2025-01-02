import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserEntity } from '../entities/user/user.entity';
import { UserModel } from '../entities/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  constructor(private http: HttpClient) {}

  get(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(this.url + '/users', this.options);
  }

  add(model: UserModel): Observable<UserEntity> {
    return this.http.post<UserEntity>(
      this.url + '/users',
      model,
      this.options
    );
  }

  update(model: UserModel, id: string): Observable<UserEntity> {
    return this.http.patch<UserEntity>(
      this.url + '/users/' + id,
      model,
      this.options
    );
  }
}
