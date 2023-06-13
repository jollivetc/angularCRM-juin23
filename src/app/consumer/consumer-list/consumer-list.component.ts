import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Observable, Subscription } from 'rxjs';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit, OnDestroy{

  consumersObservable?: Observable<Consumer[]>;
  search:string='';
  private subs:Subscription[]=[]

  constructor(private consumerService: ConsumerService){}
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit(): void {
    this.consumersObservable=this.consumerService.getAllConsumers();
  }

  doSearch():void{
    this.consumersObservable=this.consumerService.searchConsumers(this.search);
  }

  delete(id:number):void{
    this.subs.push(this.consumerService.delete(id).subscribe({
      next:(data:Object)=>{
        if(this.search){
          this.doSearch();
        }else{
          this.ngOnInit();
        }
      },
      error:(error:Error)=>{console.error(error)},
      complete:()=>{}
    }));
  }
}
