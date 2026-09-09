import { Injectable } from '@angular/core';


export interface LoginRequest {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginRequestService {

  constructor() { }
}
