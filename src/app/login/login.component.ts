import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from './model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

  loginForm: FormGroup;
  errorMessagesEmail = {
                required: 'il manque un email',
                email:'email invalide'
              };
  private subs:Subscription[]=[];

  constructor(private authentService:AuthenticationService, private router:Router){
    this.authentService.disconnect();
    this.loginForm = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required, no$InPassword])
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=> sub.unsubscribe())
  }

  login():void{
    this.subs.push(this.authentService.authentUser(this.loginForm.value.email,
                                  this.loginForm.value.password)
            .subscribe({
              next:(data:User)=>{this.router.navigateByUrl('/home')},
              error:(error:Error)=>{console.error(error)},
              complete:()=>{}
            }));
  }
}

function no$InPassword(c:AbstractControl):ValidationErrors|null{
  if((c.value as string).indexOf('$')>=0){
    return {
      no$InPassword:true
    }
  }
  return null;
}
