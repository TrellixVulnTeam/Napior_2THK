import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Tab } from '../general/input-tabs/tab';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GenericDialogService } from '../general/generic-dialog/generic-dialog.service';
import { MatDialog } from '@angular/material';
import { RunCalcService } from '../general/run-calc/run-calc.service';
import { ReportService } from '../general/report/report.service';
import { InputTabsService } from '../general/input-tabs/input-tabs.service';
import { RtdbService } from '../../../common/rtdb.service';
import { WindGraphicsControlsService } from './wind-graphics/wind-graphics-controls/wind-graphics-controls.service'

import * as inputsResultsData from './wind-inputs-results.json';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-wind-loads',
  templateUrl: './wind-loads.component.html',
  styleUrls: ['./wind-loads.component.css'],
  providers: [
    GenericDialogService,
    RunCalcService,
    ReportService,
    InputTabsService,
    WindGraphicsControlsService
  ]
})
export class WindLoadsComponent implements OnInit {
  
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.graphicWidth = window.innerWidth - 500;
    this.graphicHeight = 0.75 * (window.innerHeight - 60);
  }
  
  public resultsOrReport = 'results';
  public report = [];
  public graphicWidth: number = window.innerWidth - 500;
  public graphicHeight: number = 0.75 * (window.innerHeight - 60);
  public graphicControlStyle: {} = {'width': '190px'};
  public graphicControlOptions: {}={
    'direction': this.graphicControl.direction,
    'forceType': this.graphicControl.forceType
  }

  constructor(
    private http: Http,
    public genericDialogService: GenericDialogService,
    public calc: RunCalcService,
    public genReport: ReportService,
    public rtdb: RtdbService,
    public inputTabs: InputTabsService,
    public graphicControl: WindGraphicsControlsService
  ) {
    this.inputTabs.tabs = [
      {
        title: 'Calculation Info',
        active: true,
        icon: '/assets/Images/seismic-icons/calculation-info.svg'
      },
      {
        title: 'Site Criteria',
        active: false,
        icon: '/assets/Images/seismic-icons/site-criteria.svg'
      },
      {
        title: 'Building Criteria',
        active: false,
        icon: '/assets/Images/seismic-icons/building-criteria.svg'
      },
      {
        title: 'Components and Cladding',
        active: false,
        icon: '/assets/Images/wind-icons/components-cladding.svg'
      }
    ];
    this.inputTabs.activeTab = {
      title: 'Calculation Info',
      active: true,
      icon: '/assets/seismic-icons/Images/site-criteria.svg'
    };
    this.calc.inputs = inputsResultsData['inputs'];
    this.calc.results = inputsResultsData['results'];
  }

  ngOnInit() {
    this.calc.getUserData();
    //Subscripe to observable that updates graphic control options.
    this.graphicControl.graphicControl$.subscribe((controls)=>{
      this.graphicControlOptions = controls;
    });
  }
}
