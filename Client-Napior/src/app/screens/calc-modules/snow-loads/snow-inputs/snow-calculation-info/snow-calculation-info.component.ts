import { Component, OnInit, Input } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-snow-calculation-info',
  templateUrl: './snow-calculation-info.component.html',
  styleUrls: ['./snow-calculation-info.component.css']
})
export class SnowCalculationInfoComponent implements OnInit {

  constructor(public calc: RunCalcService) { }

  ngOnInit() {
  }

}
