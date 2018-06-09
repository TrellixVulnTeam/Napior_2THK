import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Tab } from '../general/input-tabs/tab';
import { GenericDialogService } from '../general/generic-dialog/generic-dialog.service';
import { MatDialog } from '@angular/material';
import { RunCalcService } from '../general/run-calc/run-calc.service';
import { ReportService } from '../general/report/report.service';
import { InputTabsService } from '../general/input-tabs/input-tabs.service';
import { RtdbService } from '../../../common/rtdb.service';

import * as inputsResultsData from './seismic-inputs-results.json';
import * as xml2js from 'xml2js';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-seismic-loads',
  templateUrl: './seismic-loads.component.html',
  styleUrls: ['./seismic-loads.component.css'],
  providers: [
    GenericDialogService,
    RunCalcService,
    ReportService,
    InputTabsService
  ]
})
export class SeismicLoadsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.graphicWidth = window.innerWidth - 500;
    this.graphicHeight = 0.75 * (window.innerHeight - 60);
  }
  public resultsOrReport = 'results';
  public report = [];
  public graphicWidth: number = window.innerWidth - 500;
  public graphicHeight: number = 0.75 * (window.innerHeight - 60);

  constructor(
    public genericDialogService: GenericDialogService,
    public calc: RunCalcService,
    public genReport: ReportService,
    public rtdb: RtdbService,
    public inputTabs: InputTabsService
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
  }
}
