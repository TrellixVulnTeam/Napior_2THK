import { Component, OnInit, ViewChild } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import { DynamicTableComponent } from '../../../general/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-wind-components-cladding',
  templateUrl: './wind-components-cladding.component.html',
  styleUrls: ['./wind-components-cladding.component.css']
})
export class WindComponentsCladdingComponent implements OnInit {

  @ViewChild(DynamicTableComponent)

  private dynamicTable: DynamicTableComponent;
  public tableTitles: string[];
  public componentData: any[];
  public roofTypes: string[];

  constructor( public calc: RunCalcService ) {
    this.tableTitles = ['Component Name', 'Area (sq. ft)'];
    this.roofTypes = [
      'Flat',
      'Monoslope',
      'Hip/Gable'
    ]
  }

  changeTable() {
    this.calc.inputs.componentNames = this.dynamicTable.tableData[1];
    this.calc.inputs.componentAreas = this.dynamicTable.tableData[2];
  }

  ngOnInit() {
    let componentNames: string[] = this.calc.inputs.componentNames;
    let componentAreas: number[] = this.calc.inputs.componentAreas;
    this.componentData =  [componentNames,componentAreas];
  }

}
