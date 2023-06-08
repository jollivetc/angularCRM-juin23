import { Component, OnDestroy } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { Observable, Subscriber, Subscription, catchError, map, of, take } from 'rxjs';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{

  obs?:Observable<number>;
  private subs:Subscription[]=[];

  phoneNumbers = ['0123456789', '9876543210']

  constructor(private demoObservable:DemoObservableService){}

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }

  testObservable():void{
    console.log("before")
    const subscriber = {
          next:(data:number)=>{console.log(data)},
          error:(error:Error)=>{console.error(error)},
          complete:()=>{console.log('complete')}
    }

    const subscription:Subscription = this.demoObservable.getObservable()
      .pipe(
        map(x=>x*2),
        take(5)
      ).subscribe(subscriber)
    this.subs.push(subscription);
    console.log('after')
  }

  testObservableAsync():void{
    this.obs = this.demoObservable.getObservable()
        .pipe(
          map(x=>x*10),
          catchError(error=>of(error))
        )
  }
}
