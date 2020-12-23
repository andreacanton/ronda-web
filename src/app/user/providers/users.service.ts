import { Injectable } from '@angular/core';
import { ApiClient } from '@shared/services/api.client';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly apiClient: ApiClient) {}

  public saveUser(data: Partial<User>): Observable<User> {
    return this.apiClient.post<User>('users', data);
  }

  public isFieldTaken(
    fieldName: string,
    fieldValue: string,
    userId?: string
  ): Observable<boolean> {
    const params = userId ? { userId } : {};
    return this.apiClient
      .get<{ isTaken: boolean }>(`users/is-taken/${fieldName}/${fieldValue}`, {
        params,
      })
      .pipe(
        map((response) => response.isTaken),
        catchError((err) => EMPTY)
      );
  }
}
