import { Injectable } from '@angular/core';
import { User } from './model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const USER_KEY='CRM_USER_KEY';
const TOKEN_KEY='CRM_TOKEN_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?:User;
  private token?:string;

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem(USER_KEY)){
      this.user=JSON.parse(sessionStorage.getItem(USER_KEY)!)
      this.token = sessionStorage.getItem(TOKEN_KEY)!;
    }
  }

  get jwtToken():string|undefined{
    return this.token;
  }

  get authenticated():boolean{
    return !!this.user
  }

  disconnect():void{
    this.user=undefined;
    sessionStorage.clear()
  }

  authentUser(email:string, password:string):Observable<User>{
    return this.http.post<AuthentResponse>('/api/auth/login',
                {email:email,password:password})
      .pipe(
        map((resp:AuthentResponse)=>{
          this.user = resp.user;
          this.token = resp.token;
          sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
          sessionStorage.setItem(TOKEN_KEY, this.token);
          return this.user;
        })
      );
  }
}

interface AuthentResponse{
  token:string,
  user:User
}
