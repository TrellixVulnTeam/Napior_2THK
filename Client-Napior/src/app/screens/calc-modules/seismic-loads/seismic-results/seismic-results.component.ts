import { Component, OnInit, Input } from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import { RunCalcService } from '../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-seismic-results',
  templateUrl: './seismic-results.component.html',
  styleUrls: ['./seismic-results.component.css']
})
export class SeismicResultsComponent implements OnInit {

  printResults(){
    console.log(this.calc.results);
    console.log('test');
  }

  constructor( public calc: RunCalcService ) { }

  ngOnInit() {
  }

}
