import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-wood-beam-section-settings',
  templateUrl: './wood-beam-section-settings.component.html',
  styleUrls: ['./wood-beam-section-settings.component.css']
})
export class WoodBeamSectionSettingsComponent implements OnInit {

  constructor(
    public calc: RunCalcService,
  ) { }

  ngOnInit() {
  }

}
