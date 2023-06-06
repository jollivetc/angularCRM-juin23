import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';

  fruit = {
    color:'yellow',
    type:'banana',
    img:'https://img.ltwebstatic.com/images3_pi/2022/04/18/1650249706e97fb5cf1163381788c63003cbbb4148_thumbnail_600x.webp'
  }

  persons: string[]=['Paul', 'Pierre','Jacques']

  counter:number=0;

  onClick($event:MouseEvent):void{
    this.counter= this.counter+1
  }
}
