import { Component } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private demoObservable:DemoObservableService){}

  testObservable():void{
    console.log("before")
    this.demoObservable.getObservable()
      .pipe(
        map(x=>x*2),
        take(2)
      ).subscribe({
          next:(data:number)=>{console.log(data)},
          error:(error:Error)=>{console.error(error)},
          complete:()=>{console.log('complete')}
    })
    console.log('after')
  }
}
