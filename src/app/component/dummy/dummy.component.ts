import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {

  @Input()
  label:string='';
  @Output()
  clicked:EventEmitter<number>= new EventEmitter<number>()

  handleClick():void{
    this.clicked.emit(this.label.length);
  }
}
