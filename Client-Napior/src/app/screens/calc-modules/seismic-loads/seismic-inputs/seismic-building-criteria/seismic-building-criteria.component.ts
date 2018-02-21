import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SeismicLateralSystems } from './seismic-lateral-systems';
import { DynamicTableComponent } from '../../../general/dynamic-table/dynamic-table.component';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-seismic-building-criteria',
  templateUrl: './seismic-building-criteria.component.html',
  styleUrls: ['./seismic-building-criteria.component.css']
})
export class SeismicBuildingCriteriaComponent implements OnInit {
  
  @ViewChild(DynamicTableComponent)
  
  private dynamicTable: DynamicTableComponent;
  calculatePeriod: boolean = true;
  riskCategoryArray: string[];
  tableTitles: string[];
  storyData: any[];
  systemsByCategory: any[];
  systemCategory: any;
  systemCategoryData: any;
  systemList: any[];
  lateralSystems: SeismicLateralSystems;
  system: {};

  changeCategory() {
    this.system = undefined;
  }

  changeSystem() {
    this.calc.inputs.R = this.system['R'];
    this.calc.inputs.Ct = this.system['Ct'];
    this.calc.inputs.x = this.system['x'];
    this.calc.inputs.structSystem = this.system['system'];
    this.calc.inputs.structCategory = this.systemCategoryData['name'];
  }

  changeTable() {
    this.calc.inputs.storyNames = this.dynamicTable.tableData[1];
    this.calc.inputs.storyHeights = this.dynamicTable.tableData[2];
    this.calc.inputs.storyWeights = this.dynamicTable.tableData[3];
    let cumulativeHeights = [this.calc.inputs.storyHeights[0]];
    for (let i=1; i<this.calc.inputs.storyHeights.length; i++){
      let cumHeightI=cumulativeHeights[i-1]+this.calc.inputs.storyHeights[i];
      cumulativeHeights.push(cumHeightI);
    };
    this.calc.inputs.storyCumulativeHeights = cumulativeHeights;
  }

  constructor( public calc: RunCalcService ) {
    this.calculatePeriod = true;
    this.tableTitles = ['Story', 'Height (ft)', 'Weight (k)'];
    this.riskCategoryArray = ['I', 'II', 'III', 'IV'];
    this.lateralSystems = new SeismicLateralSystems;
    this.systemsByCategory = [
      { 'name': 'Building Frames', 'data': this.lateralSystems.buildingFrames },
      { 'name': 'Bearing Walls', 'data': this.lateralSystems.bearingWalls },
      { 'name': 'Cantilever Columns', 'data': this.lateralSystems.cantileverColumns },
      { 'name': 'Dual Systems with Intermediate Moment Frames', 'data': this.lateralSystems.dualSystemsInt },
      { 'name': 'Dual Systems with Special Moment Frames', 'data': this.lateralSystems.dualSystemsSpec },
      { 'name': 'Moment Frames', 'data': this.lateralSystems.momentFrames },
      { 'name': 'Ordinary Concrete Shear Walls with Moment Frames', 'data': this.lateralSystems.concSWmomentFrames },
      { 'name': 'Steel Systems (Not Detailed for Seismic)', 'data': this.lateralSystems.r3app }
    ];
    this.systemCategoryData = this.systemsByCategory[0];
    this.system = this.lateralSystems.buildingFrames[3];
  }

  ngOnInit() {
    let storyNames: number[] = this.calc.inputs.storyNames;
    let storyHeights: number[] = this.calc.inputs.storyHeights;
    let storyWeights: number[] = this.calc.inputs.storyWeights;
    this.storyData=  [storyNames,storyHeights,storyWeights];
  }

}
