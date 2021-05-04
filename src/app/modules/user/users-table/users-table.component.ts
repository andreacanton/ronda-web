import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AVAILABLE_ROLES, AVAILABLE_STATUSES } from 'src/app/data/const';
import { PaginatedDataSource } from 'src/app/data/datasource/paginated.datasource';
import { UsersQuery } from 'src/app/data/interfaces/users.query';
import { User } from 'src/app/data/schema/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent implements OnInit, OnDestroy {
  @Input() public dataSource: PaginatedDataSource<User, UsersQuery>;
  @Input() public initialSort: Sort;
  public loadingSubscription: Subscription;
  public displayedColumns = [
    'memberNumber',
    'lastname',
    'email',
    'role',
    'status',
  ];
  public availableRoles = AVAILABLE_ROLES;
  public availableStatuses = AVAILABLE_STATUSES;

  constructor(private readonly changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadingSubscription = this.dataSource.loading$.subscribe((loading) => {
      this.changeDetection.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
