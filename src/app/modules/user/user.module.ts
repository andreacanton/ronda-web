import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [CreateUserComponent, UserListComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
