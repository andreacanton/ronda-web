import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { User } from '../schema/user';
import { UsersService } from '../services/users.service';

export class UsersDataSource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private readonly usersService: UsersService) {}

  connect(
    collectionViewer: CollectionViewer
  ): Observable<User[] | readonly User[]> {
    return this.usersSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers() {
    this.loadingSubject.next(true);
    this.usersService
      .getAll()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((users) => this.usersSubject.next(users));
  }
}
