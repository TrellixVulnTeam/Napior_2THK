import { Component, OnInit, ViewChild } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import { DynamicTableComponent } from '../../../general/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-wind-building-criteria',
  templateUrl: './wind-building-criteria.component.html',
  styleUrls: ['./wind-building-criteria.component.css']
})
export class WindBuildingCriteriaComponent implements OnInit {

  @ViewChild(DynamicTableComponent)

  private dynamicTable: DynamicTableComponent;
  public riskCategories: string[];
  public enclosureTypes: string[];
  public roofTypes: string[];
  public tableTitles: string[];
  public storyData: any[];
  public roofAreaTipTitle = 'Roof Area';
  public roofAreaImage = {
    'url':'/assets/Images/help-tips/roof-trib-tip.png',
    'height': '201px',
    'width': '800px'
  };
  public roofAreaSubTitle = 'Roof Area Input Explained'
  public roofAreaText = 'The "Roof Area, B" and "Roof Area, L" inputs provide a way to account for additional effective wind area above the eave line. For example: projected areas on a sloped roof, roof parapets, or large mechanical equipment.';

  constructor( public calc: RunCalcService ) {
    this.tableTitles = ['Story', 'h (ft)', 'B (ft)', 'L (ft)'];
    this.riskCategories = [
      'I',
      'II',
      'III',
      'IV'
    ]
    this.enclosureTypes = [
      'Partially Enclosed',
      'Enclosed'
    ]
    this.roofTypes = [
      'Flat',
      'Monoslope',
      'Hip/Gable'
    ]
  }

  changeTable() {
    this.calc.inputs.storyNames = this.dynamicTable.tableData[1];
    this.calc.inputs.storyHeights = this.dynamicTable.tableData[2];
    this.calc.inputs.storyWidths = this.dynamicTable.tableData[3];
    this.calc.inputs.storyLengths = this.dynamicTable.tableData[4];
    let cumulativeHeights = [this.calc.inputs.storyHeights[0]];
    for (let i=1; i<this.calc.inputs.storyHeights.length; i++){
      let cumHeightI=cumulativeHeights[i-1]+this.calc.inputs.storyHeights[i];
      cumulativeHeights.push(cumHeightI);
    };
    this.calc.inputs.storyCumulativeHeights = cumulativeHeights;
  }

  ngOnInit() {
    let storyNames: number[] = this.calc.inputs.storyNames;
    let storyHeights: number[] = this.calc.inputs.storyHeights;
    let storyWidths: number[] = this.calc.inputs.storyWidths;
    let storyLengths: number[] = this.calc.inputs.storyLengths;
    this.storyData=  [storyNames,storyHeights,storyWidths,storyLengths];
  }

}
