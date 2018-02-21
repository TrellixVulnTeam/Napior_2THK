import { Component, OnInit, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-seismic-site-criteria',
  templateUrl: './seismic-site-criteria.component.html',
  styleUrls: ['./seismic-site-criteria.component.css']
})
export class SeismicSiteCriteriaComponent implements OnInit {

  siteClasses: string[];
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public calc: RunCalcService) {
    this.siteClasses = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ];
  }

  ngOnInit() {
  }

}
