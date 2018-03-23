import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { Tab } from '../../general/input-tabs/tab';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GenericDialogService } from '../../general/generic-dialog/generic-dialog.service';
import { MatDialog } from '@angular/material';
import { RunCalcService } from '../../general/run-calc/run-calc.service';
import { ReportService } from '../../general/report/report.service';
import { InputTabsService } from '../../general/input-tabs/input-tabs.service';
import { RtdbService } from '../../../../common/rtdb.service';

import * as inputsResultsData from './wood-beam-inputs-results.json';

@Component({
  selector: 'app-wood-beam',
  templateUrl: './wood-beam.component.html',
  styleUrls: ['./wood-beam.component.css'],
  providers: [    
    GenericDialogService,
    RunCalcService,
    ReportService,
    InputTabsService
  ]
})
export class WoodBeamComponent implements OnInit {
  
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
    private http: Http,
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
        title: 'Sections & Materials',
        active: false,
        icon: '/assets/Images/beam-icons/wood-sections-mats.svg'
      },
      {
        title: 'Spans',
        active: false,
        icon: '/assets/Images/beam-icons/spans.svg'
      },
      {
        title: 'Loads',
        active: false,
        icon: '/assets/Images/beam-icons/loads.svg'
      },
      {
        title: 'Load Combos',
        active: false,
        icon: '/assets/Images/beam-icons/load-combos.svg'
      }
    ];
    
    this.inputTabs.activeTab = {
      title: 'Calculation Info',
      active: true,
      icon: '/assets/Images/seismic-icons/calculation-info.svg'
    };
    
    this.calc.inputs = inputsResultsData['inputs'];
    this.calc.results = inputsResultsData['results'];
  }
  
    

  ngOnInit() {
    this.calc.getUserData();
  }

}
