import { Component, OnInit, Input } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-seismic-calculation-info',
  templateUrl: './seismic-calculation-info.component.html',
  styleUrls: ['./seismic-calculation-info.component.css']
})
export class SeismicCalculationInfoComponent implements OnInit {

  constructor(public calc: RunCalcService) { }

  ngOnInit() {
  }

}
