import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';

export interface PageRequest {
  page: number;
  size: number;
  sort?: Sort;
}

export interface Page<T> {
  models: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
}
export interface PaginatedService<T, Q> {
  fetch(query: Q, pageRequest: PageRequest): Observable<Page<T>>;
}
