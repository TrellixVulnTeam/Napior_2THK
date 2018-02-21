import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from './tab';
import { InputTabsService } from './input-tabs.service';

@Component({
  selector: 'app-input-tabs',
  templateUrl: './input-tabs.component.html',
  styleUrls: ['./input-tabs.component.css']
})
export class InputTabsComponent implements OnInit {
  
  public tab: Tab;
  
  constructor(public inputTabs: InputTabsService) {
    
  }

  ngOnInit() {
  }

}
