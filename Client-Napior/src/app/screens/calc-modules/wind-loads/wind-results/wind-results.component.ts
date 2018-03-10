import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-wind-results',
  templateUrl: './wind-results.component.html',
  styleUrls: ['./wind-results.component.css']
})
export class WindResultsComponent implements OnInit {
  public ccResults: {};
  public perpBResults: {};
  public perpLResults: {};
  public results: any[];
  public ccGraphicUrl: string;

  constructor(public calc: RunCalcService) {
    this.ccResults = [
      {
        componentResults: {
          positive_pressures: [],
          zones: [],
          GCp_negative: [],
          GCp_positive: [],
          negative_pressures: []
        },
        componentName: 'Wind Girt'
      }
    ];
  }

  setCCgraphic(){
    if (this.calc.inputs.roofType === 'Flat'){
      this.ccGraphicUrl = '/assets/Images/wind-icons/flat.png';
    } else if (this.calc.inputs.roofType === 'Monoslope' && this.calc.inputs.roofSlope < 3){
      this.ccGraphicUrl = '/assets/Images/wind-icons/flat.png';
    } else if (this.calc.inputs.roofType === 'Monoslope' && this.calc.inputs.roofSlope >= 3 && this.calc.inputs.roofSlope < 10){
      this.ccGraphicUrl = '/assets/Images/wind-icons/monoslope-3-10.png';
    } else if (this.calc.inputs.roofType === 'Monoslope' && this.calc.inputs.roofSlope >= 10){
      this.ccGraphicUrl = '/assets/Images/wind-icons/monoslope-greater-10.png';
    } else if (this.calc.inputs.roofType === 'Gable' && this.calc.inputs.roofSlope < 7){
      this.ccGraphicUrl = '/assets/Images/wind-icons/gable-less-7.png';
    } else if (this.calc.inputs.roofType === 'Gable' && this.calc.inputs.roofSlope > 7){
      this.ccGraphicUrl = '/assets/Images/wind-icons/gable-greater-7.png';
    } else if (this.calc.inputs.roofType === 'Hip'){
      this.ccGraphicUrl = '/assets/Images/wind-icons/hip.png';
    } else {
      this.ccGraphicUrl = '/assets/Images/wind-icons/flat.png';
    }
  }

  ngOnInit() {
    this.perpBResults = this.calc.results.B;
    this.perpLResults = this.calc.results.L;
    this.results = [this.perpBResults, this.perpLResults];
    this.calc.ranCalc$.subscribe(() => {
      this.perpBResults = this.calc.results.B;
      this.perpLResults = this.calc.results.L;
      this.results = [this.perpBResults, this.perpLResults];
      this.ccResults = this.calc.results.B.CandC_results;
      this.setCCgraphic();
    });
  }
}
