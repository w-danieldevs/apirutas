import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserInfoModule { }
