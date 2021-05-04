import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { UsersComponent } from './users/users.component';
import { UsersFiltersComponent } from './users-filters/users-filters.component';
import { UsersFiltersSheetComponent } from './users-filters-sheet/users-filters-sheet.component';
import { UsersTableComponent } from './users-table/users-table.component';

@NgModule({
  declarations: [
    CreateUserComponent,
    UsersComponent,
    UsersFiltersComponent,
    UsersFiltersSheetComponent,
    UsersTableComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
