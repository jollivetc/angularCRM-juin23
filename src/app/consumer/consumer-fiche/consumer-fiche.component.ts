import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnDestroy{

  consumerForm:FormGroup;
  private subs:Subscription[]=[];

  constructor(private consumerService: ConsumerService, private  router:Router){
    this.consumerForm= new FormGroup({
      civility:new FormControl('', [Validators.required]),
      firstname:new FormControl('',[Validators.required]),
      lastname:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      phone:new FormControl('',[Validators.required])
    })
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }

  validate(){
    this.subs.push(this.consumerService.save(this.consumerForm.value)
        .subscribe({
          next:(data:Consumer)=>{this.router.navigateByUrl("/consumers")},
          error:(error:Error)=>{console.error(error)},
          complete:()=>{}
        }));
  }
}
