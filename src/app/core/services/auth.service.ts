import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { UserApiResponse } from '../../features/user/models/user-api-response.module';
import { UserInfo } from '../../features/user/models/user-info.module';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private http= inject (HttpClient);

private apiUrl = environment.apiUrl;

login(data: UserInfo):Observable<UserApiResponse> {
  return this.http.post<UserApiResponse>(`${this.apiUrl}/auth/login`, data).pipe(
    tap((response) =>{
      this.saveSession(response);
    })
  )
}
private saveSession(response: UserApiResponse):void {
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  localStorage.setItem('user', JSON.stringify(response.user));
}

getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

getUser(): UserInfo | null {
  const user = localStorage.getItem('user');
if (!user) {
  return null;
}
return JSON.parse(user);
}

isAuthenticated(): boolean {
  return !!this.getAccessToken();
}
}
