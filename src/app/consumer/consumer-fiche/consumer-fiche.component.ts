import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnInit, OnDestroy{

  consumerForm:FormGroup;
  private subs:Subscription[]=[];

  constructor(private consumerService: ConsumerService, private  router:Router,
                private route:ActivatedRoute){
    this.consumerForm= new FormGroup({
      id:new FormControl(),
      civility:new FormControl('', [Validators.required]),
      firstname:new FormControl('',[Validators.required]),
      lastname:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      phone:new FormControl('',[Validators.required]),
      createdAt:new FormControl(),
      updatedAt:new FormControl()
    })
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.consumerService.getConsumer(id).subscribe({
        next:(data:Consumer)=>{this.consumerForm.patchValue(data)},
        error:(error:Error)=>{console.error(error)},
        complete:()=>{}
      })
    }
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
