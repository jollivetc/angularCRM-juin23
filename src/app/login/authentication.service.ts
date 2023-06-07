import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_KEY='CRM_USER_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?:User;

  constructor() {
    if(sessionStorage.getItem(USER_KEY)){
      this.user=JSON.parse(sessionStorage.getItem(USER_KEY)!)
    }
  }

  get authenticated():boolean{
    return !!this.user
  }

  disconnect():void{
    this.user=undefined;
    sessionStorage.clear()
  }

  authentUser(email:string, password:string):User{
    this.user= {
      id:1,
      login:email,
      firstname:'John',
      lastname:'Doe'
    }
    sessionStorage.setItem(USER_KEY, JSON.stringify(this.user))
    return this.user
  }
}
