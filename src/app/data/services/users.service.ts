import { Injectable } from '@angular/core';
import { ApiClient } from '@core/services/api.client';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersFilters } from '../interfaces/users.filters';
import { User } from '../schema/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly apiClient: ApiClient) {}

  public getAll(filters: UsersFilters): Observable<User[]> {
    const params: any = {
      p: filters.page,
      psize: filters.pageSize,
      sort: filters.sort,
      dir: filters.sortDir,
    };
    const { search, status, role } = filters;
    if (search) {
      params.search = search;
    }
    if (status) {
      params.status = status;
    }
    if (role) {
      params.role = role;
    }
    return this.apiClient.get<User[]>('users', {
      params,
    });
  }
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
