import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-wind-site-criteria',
  templateUrl: './wind-site-criteria.component.html',
  styleUrls: ['./wind-site-criteria.component.css']
})
export class WindSiteCriteriaComponent implements OnInit {

  public exposureCategories: string[];
  public hillShape: string[];

  constructor( public calc: RunCalcService ) {
    this.exposureCategories = [
      'B',
      'C',
      'D'
    ]
    this.hillShape = [
      '2D Ridge',
      '2D Escarpment',
      '3D Axisymmetric Hill'
    ]
  }

  ngOnInit() {
  }

}
