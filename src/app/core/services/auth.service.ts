import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private apiUrl = 'https://sla-api.areasoftccyt.com/api'; 

  constructor() { }
}
