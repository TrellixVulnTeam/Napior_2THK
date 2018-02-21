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

  ngOnInit() {
    this.perpBResults = this.calc.results.B;
    this.perpLResults = this.calc.results.L;
    this.results = [this.perpBResults, this.perpLResults];
    this.calc.ranCalc$.subscribe(() => {
      this.perpBResults = this.calc.results.B;
      this.perpLResults = this.calc.results.L;
      this.results = [this.perpBResults, this.perpLResults];
      this.ccResults = this.calc.results.B.CandC_results;
    });
  }
}
