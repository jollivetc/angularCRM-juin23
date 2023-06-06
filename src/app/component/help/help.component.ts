import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'crm-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  @Input()
  field?:AbstractControl;

  @Input()
  errorMessages?:{[key:string]:string};

  isError():boolean{
    return !!this.field && this.field?.touched && this.field?.invalid;
  }

  get errors():string[]{
    return Object.keys(this.field?.errors as Object)
            .map(item => this.errorMessages?.[item]?
                  this.errorMessages?.[item] :
                  `missing error message for ${item}`);
  }
}
