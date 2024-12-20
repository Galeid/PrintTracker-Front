import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SessionEntity } from '../entities/login/session.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';
  options = {
    headers: {
      Accept: 'application/json',
    },
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<SessionEntity> {
    return this.http.post<SessionEntity>(
      this.url + '/auth/login',
      {
        username,
        password,
      },
      this.options
    );
  }
}
