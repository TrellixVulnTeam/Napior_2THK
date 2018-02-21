import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, DoCheck, ChangeDetectionStrategy, ApplicationRef } from '@angular/core';
import { MathDirective } from '../../../general/report/math.directive';
import { MathLineDirective } from '../../../general/report/math-line.directive';
import { ReportService } from '../../../general/report/report.service';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import * as katex from 'katex';

@Component({
  selector: 'app-snow-report',
  templateUrl: './snow-report.component.html',
  styleUrls: ['./snow-report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnowReportComponent implements OnInit {

  public results = this.calc.results;
  public inputs = this.calc.inputs;
  private reportSubscription;
  public rigid: boolean;
  public graphicWidth = (window.innerWidth - 500) * 0.39;
  public graphicHeight = (window.innerWidth - 500) * 0.2;

  public S: string;
  public hd: string;
  public pdMaxHipGable: string;
  public wHipGable: string;
  public hb: string;
  public hdLeeward: string;
  public hdWindward: string;

  constructor( private el: ElementRef, private cd: ChangeDetectorRef,  public calc: RunCalcService, public genReport: ReportService ) { }

  generateReport() {

    this.S = `\\frac{1}{tan(\\theta)} = \\frac{1}{tan(${this.calc.inputs.roofSlope}^{\\circ})}`;
    this.hd = `0.43\\sqrt[3]{l_{u}}\\sqrt[4]{p_{g} + 10}-1.5 = 0.43\\sqrt[3]{${this.calc.results.reportValues.lu} ft}\\sqrt[4]{${this.calc.inputs.groundSnowLoad} psf + 10}-1.5`;
    this.pdMaxHipGable = `\\frac{h_{d}\\gamma}{\\sqrt{S}} = \\frac{(${this.calc.results.reportValues.hd} ft)(${this.calc.results.reportValues.gamma} pcf)}{\\sqrt{${this.calc.results.reportValues.S} ft}}`;
    this.wHipGable = `\\frac{8h_{d}\\sqrt{S}}{3} = \\frac{8(${this.calc.results.reportValues.hd} ft)\\sqrt{${this.calc.results.reportValues.S} ft}}{3}`;
    this.hb = `\\frac{p_{f}}{\\gamma} = \\frac{${this.calc.results.pf} psf}{${this.calc.results.reportValues.gamma} pcf}`;
    this.hdLeeward = `0.43\\sqrt[3]{l_{u}}\\sqrt[4]{p_{g} + 10}-1.5 = 0.43\\sqrt[3]{${this.calc.inputs.lengthUpperRoof} ft}\\sqrt[4]{${this.calc.inputs.groundSnowLoad} psf + 10}-1.5`;
    this.hdWindward = `0.43\\sqrt[3]{l_{u}}\\sqrt[4]{p_{g} + 10}-1.5 = 0.43\\sqrt[3]{${this.calc.inputs.lengthLowerRoof} ft}\\sqrt[4]{${this.calc.inputs.groundSnowLoad} psf + 10}-1.5`;

    this.genReport.generateReportList();
    setTimeout(() => {
      this.cd.detectChanges();
      this.genReport.thickenFracLines();
    }, 5);
  }
  
  genAndFormatReport(){
    this.generateReport();
    setTimeout(() => {
      this.genReport.controlSqrtLines();
    }, 50);
  }

  ngOnInit() {
    this.rigid = (this.calc.inputs.period < 1) ? true : false;
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
