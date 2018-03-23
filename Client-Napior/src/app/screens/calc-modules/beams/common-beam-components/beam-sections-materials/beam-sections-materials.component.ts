import { Component, OnInit } from '@angular/core';
import { BeamSection } from './beam-section';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-beam-sections-materials',
  templateUrl: './beam-sections-materials.component.html',
  styleUrls: ['./beam-sections-materials.component.css']
})
export class BeamSectionsMaterialsComponent implements OnInit {
  
  public sections = [];

  constructor(
    public calc: RunCalcService,
  ) {

  }
  
  addSection():void {
    this.calc.inputs.sections.push(this.calc.inputs.sections[this.calc.inputs.sections.length - 1]);
  }
  
  deleteSection(i) {
    this.calc.inputs.sections.splice(i, 1);
  }

  ngOnInit() {

  }

}
