import { Component, OnInit, Input } from '@angular/core';
import { RunCalcService } from '../../../../general/run-calc/run-calc.service';

import * as properties from '../wood-beam-properties.json';

@Component({
  selector: 'app-wood-beam-sections-materials',
  templateUrl: './wood-beam-sections-materials.component.html',
  styleUrls: ['./wood-beam-sections-materials.component.css']
})
export class WoodBeamSectionsMaterialsComponent implements OnInit {

  @Input() sectionIndex: number;

  public sectionTypes = [
    {'tag': 'sawnLumber', 'title': 'Sawn Lumber'},
    {'tag': 'glulam', 'title': 'Glulam'}
  ];
  public sections= [
    {'tag': '2x4', 'title': '2 X 4'},
    {'tag': '2x6', 'title': '2 X 6'}
  ];
  public speciesArray = [
    {'tag': 'dfl', 'title': 'Douglas Fir-Larch'},
    {'tag': 'spf', 'title': 'Spruce Pine Fir'},
    {'tag': 'sp', 'title': 'Southern Pine'}
  ];
  public grades = [
    {'tag': 'no1', 'title': 'No. 1'},
    {'tag': 'no2', 'title': 'No. 2'}
  ]

  constructor(public calc: RunCalcService) { }

  enumerateSections(type){
    const propertiesLib = properties['sections'][type]['properties'];
    for (let prop in propertiesLib){
      console.log(prop);
    }
  }

  ngOnInit() {
    this.enumerateSections('sawnLumber');
  }

}
