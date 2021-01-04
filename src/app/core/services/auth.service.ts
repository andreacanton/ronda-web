import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiClient } from './api.client';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/app/data/schema/user';
import { JwtPayload } from '@core/interfaces/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apiClient: ApiClient) {}

  public login(identity: string, password: string) {
    return this.apiClient
      .post<{ access_token: string }>('auth/login', {
        identity,
        password,
      })
      .pipe(
        map(({ access_token }) => {
          localStorage.setItem('access_token', access_token);
          return true;
        }),
        catchError((errors) => {
          return errors;
        })
      );
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public getPublicKey(): Observable<jwt.Secret> {
    return this.apiClient.get<jwt.Secret>('auth/public-key');
  }

  public getUserInfo(): Observable<User | null> {
    const token = localStorage.getItem('access_token');
    return this.getPublicKey().pipe(
      map((key) => {
        try {
          const payload = jwt.verify(token, key) as JwtPayload;
          return {
            userId: payload.sub,
            memberNumber: payload.memberNumber,
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.lastname,
            role: payload.role,
          } as User;
        } catch (err) {
          return null;
        }
      })
    );
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getUserInfo().pipe(map((response) => !!response));
  }
}
