import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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

  constructor(){
    this.loginForm = new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('', [Validators.required, no$InPassword])
    });
  }

  login():void{
    console.log(this.loginForm);
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
