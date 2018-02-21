import { Component, OnInit, Input, ElementRef, AfterViewInit , ChangeDetectorRef, DoCheck, ChangeDetectionStrategy, AfterViewChecked } from '@angular/core';
import { MathDirective } from './math.directive';
import { MathLineDirective } from './math-line.directive';
import { ReportService } from './report.service';
import { RunCalcService } from '../run-calc/run-calc.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PrintStatusComponent } from './print-status/print-status.component';
import * as katex from 'katex';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {

  document: HTMLElement;
  public report: any;
  public type = 'report';
  public width: number = (window.innerWidth - 500) * 0.39;
  public height: number = (window.innerWidth - 500) * 0.2;

  

  constructor( private el: ElementRef, private cd: ChangeDetectorRef,  public calc: RunCalcService, public genReport: ReportService,  public dialog: MatDialog ) { }

  print(): void {
    let dialogRef = this.dialog.open(PrintStatusComponent, {
      width: '450px',
      height: '250px'
    });
  }
  
  
  ngOnInit() {
    this.genReport.report$.subscribe(
      report => {
        this.report = report;
    })
  }
  
  ngAfterViewInit(){
    this.genReport.report$.subscribe(
      report => {
        this.report = report;
    })
  }
}