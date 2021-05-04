import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { PaginatedDataSource } from 'src/app/data/datasource/paginated.datasource';
import { UsersQuery } from 'src/app/data/interfaces/users.query';
import { User } from 'src/app/data/schema/user';
import { UsersService } from 'src/app/data/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  public dataSource: PaginatedDataSource<User, UsersQuery>;

  public initialSort: Sort = {
    active: 'memberNumber',
    direction: 'asc',
  };
  constructor(
    private readonly userService: UsersService,
    private readonly changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource = new PaginatedDataSource<User, UsersQuery>(
      this.userService,
      this.initialSort,
      {},
      10
    );
  }
  ngOnDestroy(): void {}
}
