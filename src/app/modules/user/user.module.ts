import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [CommonModule, SharedModule],
})
export class UserModule {}
