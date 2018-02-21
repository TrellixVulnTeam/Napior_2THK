import { Component, OnInit } from '@angular/core';
import { WindGraphicsControlsService} from './wind-graphics-controls.service';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-wind-graphics-controls',
  templateUrl: './wind-graphics-controls.component.html',
  styleUrls: ['./wind-graphics-controls.component.css']
})
export class WindGraphicsControlsComponent implements OnInit {

  public directions = [
    {'value':'B','title':'Perp to B'}, 
    {'value':'L','title':'Perp to L'}
  ];

  constructor( public graphicControl: WindGraphicsControlsService, public calc: RunCalcService ) {}

  changeControl(){
    this.graphicControl.graphicControlSource.next(
      {
        'direction': this.graphicControl.direction,
        'forceType': this.graphicControl.forceType
      }
    );
  }

  ngOnInit() {
    this.graphicControl.graphicControlSource.next(
      {
        'direction': this.graphicControl.direction,
        'forceType': this.graphicControl.forceType
      }
    );
  }

}
