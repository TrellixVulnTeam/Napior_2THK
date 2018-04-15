import { Component, OnInit, Input } from '@angular/core';
import { RunCalcService } from '../../../../general/run-calc/run-calc.service';
import { BeamSection } from '../../../common-beam-components/beam-sections-materials/beam-section';

import * as properties from '../wood-beam-properties.json';

@Component({
  selector: 'app-wood-beam-sections-materials',
  templateUrl: './wood-beam-sections-materials.component.html',
  styleUrls: ['./wood-beam-sections-materials.component.css']
})
export class WoodBeamSectionsMaterialsComponent implements OnInit {

  @Input() sectionIndex: number;
  public currentSection: BeamSection;

  public sectionTypes = [
    'Sawn Lumber',
    'Glulam'
  ];
  public breadths= {
    'Sawn Lumber': [
      '2 x',
      '4 x',
      '6 x',
    ],
    'Glulam': [
      '3 1/8 x',
      '3 1/2 x',
      '5 1/8 x',
      '5 1/2 x',
      '6 3/4 x',
      '8 3/4 x'
    ]
  };
  public sections = properties['sectionArrays'];
  public speciesArray = {
    'Sawn Lumber':[
      'Douglas Fir-Larch',
      'Hem-Fir',
      'Southern Pine',
      'Spruce-Pine-Fir'
    ],
    'Glulam':[
      'Douglas Fir'
    ]
  }
  
  public speciesAbbreviations = {
    'Douglas Fir-Larch': 'DF-L',
    'Hem-Fir': 'HF',
    'Southern Pine': 'SP',
    'Spruce-Pine-Fir': 'SPF',
    'Douglas Fir': 'DF'
  }
  public grades = {
    'Sawn Lumber':[
      'No. 1',
      'No. 2'
    ],
    'Glulam':[
      '24F-V4',
      '24F-V8'
    ]
  }

  constructor(public calc: RunCalcService) {
    this.currentSection = this.calc.inputs.sections[0];
  }

  changeMaterial(){
    this.calc.inputs.sections[this.sectionIndex].material = `${this.speciesAbbreviations[this.calc.inputs.sections[this.sectionIndex].materialData.species]} ${this.calc.inputs.sections[this.sectionIndex].materialData.grade}`;
  }

  ngOnInit() {
  }

}
