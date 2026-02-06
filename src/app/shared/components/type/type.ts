import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-type',
  imports: [],
  templateUrl: './type.html',
  styleUrl: './type.css',
})
export class Type {

  @Input () type: string = "";

}
