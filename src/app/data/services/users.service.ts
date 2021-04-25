import { Injectable } from '@angular/core';
import { ApiClient } from '@core/services/api.client';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersQuery } from '../interfaces/users.query';
import { Page, PageRequest, PaginatedService } from '../interfaces/page';
import { User } from '../schema/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements PaginatedService<User, UsersQuery> {
  constructor(private readonly apiClient: ApiClient) {}

  public fetch(
    query: UsersQuery,
    pageRequest: PageRequest
  ): Observable<Page<User>> {
    const { page, size, sort } = pageRequest;
    const params: any = {
      p: page + 1,
      psize: size,
    };
    if (sort && sort.active && sort.direction) {
      params.sort = sort.active;
      params.sortDir = sort.direction;
    }
    const { search, status, role } = query;
    if (search) {
      params.q = search;
    }
    if (status) {
      params.status = status;
    }
    if (role) {
      params.role = role;
    }
    return this.apiClient.get<Page<User>>('users', {
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
