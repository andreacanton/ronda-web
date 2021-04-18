import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersDataSource } from 'src/app/data/datasource/users.datasource';
import { User } from 'src/app/data/schema/user';
import { UsersService } from 'src/app/data/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public dataSource: UsersDataSource;

  constructor(private readonly userService: UsersService) {}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.loadUsers();
  }
}
