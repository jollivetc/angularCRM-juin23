import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Observable } from 'rxjs';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit{

  consumersObservable?: Observable<Consumer[]>;
  search:string='';

  constructor(private consumerService: ConsumerService){}

  ngOnInit(): void {
    this.consumersObservable=this.consumerService.getAllConsumers();
  }

  doSearch():void{
    this.consumersObservable=this.consumerService.searchConsumers(this.search);
  }

}
