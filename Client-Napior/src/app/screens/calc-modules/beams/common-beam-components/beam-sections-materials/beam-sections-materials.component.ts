import { Component, OnInit } from '@angular/core';
import { BeamSection } from './beam-section';

@Component({
  selector: 'app-beam-sections-materials',
  templateUrl: './beam-sections-materials.component.html',
  styleUrls: ['./beam-sections-materials.component.css']
})
export class BeamSectionsMaterialsComponent implements OnInit {
  
  public sections = [];

  constructor() {

  }
  
  addSection():void {
    this.sections.push(this.sections[this.sections.length - 1]);
  }
  
  deleteSection(i) {
    this.sections.splice(i, 1);
    console.log(this.sections);
  }

  ngOnInit() {
    const section1 = new BeamSection(
      '2x4',
      '2X4',
      {},
      'dflno2',
      'No. 2 DF-L',
      {}
    )
    const section2 = new BeamSection(
      'gl4x15',
      'GL 4X15',
      {},
      '24fv4',
      '24F - V4',
      {}
    )
    this.sections = [section1, section2];
    console.log(this.sections)
  }

}
