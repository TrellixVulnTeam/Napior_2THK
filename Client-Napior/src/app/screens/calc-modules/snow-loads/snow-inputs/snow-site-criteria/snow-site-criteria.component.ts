import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-snow-site-criteria',
  templateUrl: './snow-site-criteria.component.html',
  styleUrls: ['./snow-site-criteria.component.css']
})
export class SnowSiteCriteriaComponent implements OnInit {

  public terrainCategories = [
    'B',
    'C',
    'D',
    'Windswept Mountains',
    'Alaskan Tundra'
  ];
  public roofExposures = [
    'Fully Exposed',
    'Partially Exposed',
    'Sheltered'
  ]

  constructor(public calc: RunCalcService) { }

  ngOnInit() {
  }

}
