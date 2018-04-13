import { Component, OnInit } from '@angular/core';
import { BeamSection } from './beam-section';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import { WoodBeamSectionsMaterialsComponent } from '../../wood-beam/wood-beam-inputs/wood-beam-sections-materials/wood-beam-sections-materials.component';

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
    const recentSection = this.calc.inputs.sections[this.calc.inputs.sections.length - 1]
    const newSection = new BeamSection(
      '2 x 4',
      { 
        'type': 'Sawn Lumber',
        'breadth': '2 x'
      },
      'No. 2 DF-L',
      {
        'species': 'Douglas Fir-Larch',
        'grade': 'No. 2'
      }
    )
    this.calc.inputs.sections.push(newSection);
  }
  
  deleteSection(i) {
    this.calc.inputs.sections.splice(i, 1);
  }

  ngOnInit() {
  }

}
