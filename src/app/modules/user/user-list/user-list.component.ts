import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsersDataSource } from 'src/app/data/datasource/users.datasource';
import { UsersFilters } from 'src/app/data/interfaces/users.filters';
import { User } from 'src/app/data/schema/user';
import { UsersService } from 'src/app/data/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  public dataSource: UsersDataSource;

  public loadingSubscription: Subscription;

  public filters: UsersFilters = {
    page: 1,
    pageSize: 10,
    sort: 'memberNumber',
    sortDir: 'asc',
  };

  constructor(
    private readonly userService: UsersService,
    private readonly changeDetection: ChangeDetectorRef
  ) {}

  public displayedColumns = [
    'memberNumber',
    'firstname',
    'email',
    'role',
    'status',
  ];
  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers(this.filters);
    this.loadingSubscription = this.dataSource.loading$.subscribe((loading) => {
      this.changeDetection.markForCheck();
    });
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
