import { Component, OnInit, Input, ElementRef, AfterViewInit , ChangeDetectorRef, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { MathDirective } from '../../../general/report/math.directive';
import { ReportService } from '../../../general/report/report.service';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import * as katex from 'katex';

@Component({
  selector: 'app-seismic-report',
  templateUrl: './seismic-report.component.html',
  styleUrls: ['./seismic-report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeismicReportComponent implements OnInit {

  document: HTMLElement;
  public report: any;
  public reportPageList: any[] = [];
  public type = 'report';
  public width: number = (window.innerWidth - 500) * 0.39;
  public height: number = (window.innerWidth - 500) * 0.2;
  public taStatus = 'letNapiorCalcPeriod';
  public reportArray: any[];
  private reportSubscription;

  public sdsCalc: string;
  public sd1Calc: string;
  public periodCalc1: string;
  public CuTaCalc: string;
  public CsCalc: string;
  public CsCalc1: string;
  public CsCalc2: string;
  public CsCalc3: string;
  public CsCalc4: string;
  public cvxCalc: string;

  checkTa() {
    if (this.calc.inputs.letNapiorCalcPeriod === true) {
      this.taStatus = 'letNapiorCalcPeriod';
    } else {
      if (this.calc.results.reportValues.T_m > this.calc.results.CuTa) {
        this.taStatus = 'knownGreaterThanCuTa';
      } else if (this.calc.results.reportValues.T_m < this.calc.results.CuTa && this.calc.results.reportValues.T_m > this.calc.results.Ta) {
        this.taStatus = 'knownBetweenCuTaandTa';
      } else {
        this.taStatus = 'knownLessThanTa';
      }
    }
  }
  
  generateReport() {
    // Math strings for Math (katex) directive.
    this.sdsCalc = `\\frac{2}{3}F_{a}S_{s} = \\frac{2}{3}(${this.genReport.round(this.calc.inputs.Fa, 1)})(${this.genReport.round(this.calc.inputs.Ss, 3)} g) `;
    this.sd1Calc = `\\frac{2}{3}F_{v}S_{1} = \\frac{2}{3}(${this.genReport.round(this.calc.inputs.Fv, 3)})(${this.genReport.round(this.calc.inputs.S1, 3)} g) `;
    this.periodCalc1 = `C_{t}h_{n}^{x} = (${this.calc.inputs.Ct})(${this.calc.results.Height} ft)^{${this.calc.inputs.x}}`;
    this.CuTaCalc = `C_{u}T_{a} = (${this.calc.results.reportValues.Cu})(${this.calc.results.Ta} \\, seconds)`;
    this.CsCalc = `\\frac{S_{ds}}{(R/I_{e})} = \\frac{${this.genReport.round(this.calc.inputs.Sds, 3)}\\,g}{(${this.calc.inputs.R}/${this.calc.results.reportValues.Ie})}`;
    this.CsCalc1 = `\\frac{S_{d1}}{T_{a}(R/I_{e})} = \\frac{${this.genReport.round(this.calc.inputs.Sd1, 3)}\\,g}{${this.calc.results.Ta}\\,s\\,(${this.calc.inputs.R}{/}${this.calc.results.reportValues.Ie})}`;
    this.CsCalc2 = `\\frac{S_{d1}*T_{L}}{T_{a}^{2}(R/I_{e})} = \\frac{${this.genReport.round(this.calc.inputs.Sd1, 3)}\\,g*${this.calc.inputs.Tl}\\,s}{${this.calc.results.Ta}^{2}\\,s\\,(${this.calc.inputs.R}/${this.calc.results.reportValues.Ie})}`;
    this.CsCalc3 = `0.44S_{ds}I_{e} = 0.44(${this.genReport.round(this.calc.inputs.Sds, 3)}\\,g)(${this.calc.results.reportValues.Ie}) > 0.01`;
    this.CsCalc4 = `\\frac{0.5*S_{1}}{(R/I_{e})} =  \\frac{0.5*${this.genReport.round(this.calc.inputs.Sd1, 3)}\\,g}{(${this.calc.inputs.R}{/}${this.calc.results.reportValues.Ie})}`;
    this.cvxCalc = `\\frac{w_{x}h_{x}^{k}}{\\sum_{i=1}^{n} w_{i}h_{i}^{k}}`;

    this.checkTa();
    this.genReport.generateReportList();
    setTimeout(() => {
      this.cd.detectChanges();
      this.genReport.thickenFracLines();
     }, 2);
  }

  genAndFormatReport(){
    this.generateReport();
    setTimeout(() => {
      this.genReport.controlSqrtLines();
    }, 500);
  }

  constructor( private el: ElementRef, private cd: ChangeDetectorRef,  public calc: RunCalcService, public genReport: ReportService ) { }

  ngOnInit() {
    this.reportSubscription = this.calc.ranCalc$.subscribe(()=>{
      this.genAndFormatReport();
    })
  }
  
  ngAfterViewInit(){
    console.log('Draw Report')
    this.genAndFormatReport();
  }

  ngOnDestroy(){
    this.reportSubscription.unsubscribe();
  }
}
