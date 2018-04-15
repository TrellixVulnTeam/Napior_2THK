import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InputChangeService {

  public inputChangeSource = new Subject<string>();
  inputChange$ = this.inputChangeSource.asObservable();

  constructor() { }

  redrawGraphic(){
    this.inputChangeSource.next('graphic');
  }

}
