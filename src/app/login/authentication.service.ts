import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authentUser(email:string, password:string):any{
    return {
      id:1,
      login:email,
      firstname:'John',
      lastname:'Doe'
    }
  }
}
