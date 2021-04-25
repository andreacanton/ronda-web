import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PaginatedDataSource } from 'src/app/data/datasource/paginated.datasource';
import { UsersQuery } from 'src/app/data/interfaces/users.query';
import { User } from 'src/app/data/schema/user';
import { UsersFiltersSheetComponent } from '../users-filters-sheet/users-filters-sheet.component';

@Component({
  selector: 'app-users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss'],
})
export class UsersFiltersComponent implements OnInit {
  @Input()
  public dataSource: PaginatedDataSource<User, UsersQuery>;
  constructor(private readonly filtersSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  openFiltersSheet(): void {
    this.filtersSheet.open(UsersFiltersSheetComponent, {
      data: this.dataSource,
    });
  }
}
