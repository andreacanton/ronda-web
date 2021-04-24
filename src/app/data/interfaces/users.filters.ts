import { Sort } from '@angular/material/sort';

export interface UsersFilters {
  page: number;
  pageSize: number;
  sort?: Sort;
  search?: string;
  status?: string;
  role?: string;
}
