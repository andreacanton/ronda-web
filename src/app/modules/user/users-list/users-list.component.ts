import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { AVAILABLE_ROLES, AVAILABLE_STATUSES } from 'src/app/data/const';
import { PaginatedDataSource } from 'src/app/data/datasource/paginated.datasource';
import { UsersQuery } from 'src/app/data/interfaces/users.query';
import { User } from 'src/app/data/schema/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Input() public dataSource: PaginatedDataSource<User, UsersQuery>;

  public availableRoles = AVAILABLE_ROLES;
  public availableStatuses = AVAILABLE_STATUSES;
  constructor() {}

  ngOnInit(): void {}
}
