import { Component } from '@angular/core';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { SeismicLoadsComponent } from './screens/calc-modules/seismic-loads/seismic-loads.component';
import { SeismicResultsComponent } from './screens/calc-modules/seismic-loads/seismic-results/seismic-results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {}

}
