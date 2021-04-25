import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { PaginatedDataSource } from 'src/app/data/datasource/paginated.datasource';
import { UsersQuery } from 'src/app/data/interfaces/users.query';
import { User } from 'src/app/data/schema/user';

@Component({
  selector: 'app-users-filters-sheet',
  templateUrl: './users-filters-sheet.component.html',
  styleUrls: ['./users-filters-sheet.component.scss'],
})
export class UsersFiltersSheetComponent implements OnInit {
  public filtersForm: FormGroup;

  constructor(
    private readonly bottomSheetRef: MatBottomSheetRef<UsersFiltersSheetComponent>,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public dataSource: PaginatedDataSource<User, UsersQuery>
  ) {}

  ngOnInit(): void {
    const fb = this.formBuilder;
    this.filtersForm = fb.group({
      search: [null],
      role: [null],
      status: [null],
    });
  }
  public onSubmit(): void {
    this.dataSource.queryBy(this.filtersForm.value);
    this.bottomSheetRef.dismiss();
  }
}
