export interface UsersFilters {
  page: number;
  pageSize: number;
  sort: string;
  sortDir: 'asc' | 'desc';
  search?: string;
  status?: string;
  role?: string;
}
