import { DataSource } from '@angular/cdk/collections';
import { Sort } from '@angular/material/sort';
import {
  Observable,
  Subject,
  BehaviorSubject,
  combineLatest,
  defer,
} from 'rxjs';
import { switchMap, startWith, map, share, finalize } from 'rxjs/operators';
import { Page, PaginatedService } from '../interfaces/page';

export function prepare<T>(
  callback: () => void
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
}

export function indicate<T>(
  indicator: Subject<boolean>
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      prepare(() => indicator.next(true)),
      finalize(() => indicator.next(false))
    );
}

export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;
  disconnect(): void;
}

export class PaginatedDataSource<T, Q> implements SimpleDataSource<T> {
  private pageNumber = new Subject<number>();
  private sort: BehaviorSubject<Sort>;
  private query: BehaviorSubject<Q>;
  private loading = new Subject<boolean>();

  public loading$ = this.loading.asObservable();
  public page$: Observable<Page<T>>;

  constructor(
    private service: PaginatedService<T, Q>,
    initialSort: Sort,
    initialQuery: Q,
    public pageSize = 20
  ) {
    this.query = new BehaviorSubject<Q>(initialQuery);
    this.sort = new BehaviorSubject<Sort>(initialSort);
    const param$ = combineLatest([this.query, this.sort]);
    this.page$ = param$.pipe(
      switchMap(([query, sort]) =>
        this.pageNumber.pipe(
          startWith(0),
          switchMap((page) =>
            this.service
              .fetch(query, { page, sort, size: this.pageSize })
              .pipe(indicate(this.loading))
          )
        )
      ),
      share()
    );
  }

  sortBy(sort: Partial<Sort>): void {
    const lastSort = this.sort.getValue();
    const nextSort = { ...lastSort, ...sort };
    this.sort.next(nextSort);
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = { ...lastQuery, ...query };
    this.query.next(nextQuery);
  }

  fetch(page: number): void {
    this.pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map((page) => page.models));
  }

  disconnect(): void {}
}
