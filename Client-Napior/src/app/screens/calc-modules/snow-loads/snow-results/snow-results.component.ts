import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-snow-results',
  templateUrl: './snow-results.component.html',
  styleUrls: ['./snow-results.component.css']
})
export class SnowResultsComponent implements OnInit {

  constructor( public calc: RunCalcService ) { }

  ngOnInit() {
  }

}
