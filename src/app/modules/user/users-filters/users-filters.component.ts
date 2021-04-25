import { Component, Input, OnInit } from '@angular/core';
import { PaginatedDataSource } from 'src/app/data/datasource/paginated.datasource';
import { UsersQuery } from 'src/app/data/interfaces/users.query';
import { User } from 'src/app/data/schema/user';

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss'],
})
export class UsersFiltersComponent implements OnInit {
  @Input()
  public dataSource: PaginatedDataSource<User, UsersQuery>;
  constructor() {}

  ngOnInit(): void {}
}
