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
import { BeamSection } from '../common-beam-components/beam-sections-materials/beam-section';
import { BeamSpan } from '../common-beam-components/beam-spans/beam-span';
import { CommonBeamService } from '../common-beam-components/common-beam.service';
import { WoodBeamService } from './wood-beam.service';
import { InputChangeService } from '../../general/inputs/input-change.service';

import * as inputsResultsData from './wood-beam-inputs-results.json';

@Component({
  selector: 'app-wood-beam',
  templateUrl: './wood-beam.component.html',
  styleUrls: ['./wood-beam.component.css'],
  providers: [    
    GenericDialogService,
    RunCalcService,
    ReportService,
    InputTabsService,
    CommonBeamService,
    WoodBeamService,
    InputChangeService
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
    const section0 = new BeamSection(
      '2 x 4',
      { 
        'type': 'Sawn Lumber',
        'breadth': '2 x'
      },
      'No. 2 DF-L',
      {
        'species': 'Douglas Fir-Larch',
        'grade': 'No. 2'
      }
    )
    this.calc.inputs.nodes = ['Pinned', 'Pinned'];
    this.calc.inputs.sections.push(section0);
    const span0 = new BeamSpan(10, '2 x 4', 0, 1);
    this.calc.inputs.spans.push(span0);
    this.calc.getUserData();
  }

}
