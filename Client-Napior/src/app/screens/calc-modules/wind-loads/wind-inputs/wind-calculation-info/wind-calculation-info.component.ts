import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-wind-calculation-info',
  templateUrl: './wind-calculation-info.component.html',
  styleUrls: ['./wind-calculation-info.component.css']
})
export class WindCalculationInfoComponent implements OnInit {

  constructor( public calc: RunCalcService ) { }

  ngOnInit() {
  }

}
