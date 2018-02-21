import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-snow-building-criteria',
  templateUrl: './snow-building-criteria.component.html',
  styleUrls: ['./snow-building-criteria.component.css']
})
export class SnowBuildingCriteriaComponent implements OnInit {

  public riskCategories = [
    'I',
    'II',
    'III',
    'IV'
  ];
  public temperatureFactors = [
    1.0,
    1.1,
    1.2,
    1.3,
    0.85
  ];
  public surfaceTypes = [
    'Slippery',
    'Other'
  ];
  public roofTypes = [
    'Flat',
    'Monoslope',
    'Hip/Gable',
    'Stepped'
  ];

  constructor(public calc: RunCalcService) { }

  foo(){}

  ngOnInit() {
  }

}
