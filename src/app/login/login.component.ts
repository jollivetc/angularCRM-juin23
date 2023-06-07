import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessagesEmail = {
                required: 'il manque un email',
                email:'email invalide'
              };

  constructor(private authentService:AuthenticationService, private router:Router){
    this.authentService.disconnect();
    this.loginForm = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required, no$InPassword])
    });
  }

  login():void{
    const user:User = this.authentService.authentUser(this.loginForm.value.email,
                                  this.loginForm.value.password)
    if(user){
      this.router.navigateByUrl('/home');
    }
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
