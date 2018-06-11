import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WindGraphicsControlsService {

  public direction = 'B';
  public forceType = 'pressures';
  public graphicControlSource = new Subject();
  graphicControl$ = this.graphicControlSource.asObservable();

  constructor() { }

}
