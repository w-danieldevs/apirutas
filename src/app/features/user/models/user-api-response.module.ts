import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo } from './user-info.module';


export interface UserApiResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserApiResponseModule { }
