import { Injectable } from '@angular/core';
import { Tab } from './tab';
import { Subject } from 'rxjs';

@Injectable()
export class InputTabsService {

  public tabs: Tab[];
  public activeTab: Tab;
  public tab: Tab;
  private activeTabSource = new Subject<string>();
  activeTab$ = this.activeTabSource.asObservable();

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    this.activeTab = tab;
  }

  constructor() { }

}
