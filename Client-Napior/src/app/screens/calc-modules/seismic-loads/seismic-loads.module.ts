// @angular modules.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppModule } from '../../../app.module';
import { GeneralCalcModule } from '../general/general-calc.module';

// Imported modules
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ResizableModule } from 'angular-resizable-element';
import { ClickOutsideModule } from 'ng-click-outside';
import { AgmCoreModule } from '@agm/core';

// Angular material modules.
import {
  MatButtonToggleModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatDialogModule,
  MatCardModule,
  MatSnackBarModule,
  //MATERIAL_COMPATIBILITY_MODE
} from '@angular/material';

// Self-made components and services
import { SeismicLoadsComponent } from './seismic-loads.component';
import { SeismicResultsComponent } from './seismic-results/seismic-results.component';
import { SeismicCalculationInfoComponent } from './seismic-inputs/seismic-calculation-info/seismic-calculation-info.component';
import { SeismicSiteCriteriaComponent } from './seismic-inputs/seismic-site-criteria/seismic-site-criteria.component';
import { SeismicBuildingCriteriaComponent } from './seismic-inputs/seismic-building-criteria/seismic-building-criteria.component';
import { UsgsSeismicComponent } from './seismic-inputs/seismic-site-criteria/usgs-seismic/usgs-seismic.component';
import { MapChild } from './seismic-inputs/seismic-site-criteria/usgs-seismic/map-child.component';
import { SeismicReportComponent } from './seismic-results/seismic-report/seismic-report.component';
import { SeismicGraphicsComponent } from './seismic-graphics/seismic-graphics.component';

@NgModule({
  imports: [
    GeneralCalcModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    FlexLayoutModule,
    AppModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    ResizableModule,
    ClickOutsideModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1OHNGDlf4L769UocCrq6u2fhkbtM-z9Y'
    })
  ],
  declarations: [
    SeismicLoadsComponent,
    SeismicResultsComponent,
    SeismicCalculationInfoComponent,
    SeismicSiteCriteriaComponent,
    SeismicBuildingCriteriaComponent,
    UsgsSeismicComponent,
    MapChild,
    SeismicReportComponent,
    SeismicGraphicsComponent
  ],
  exports: [SeismicLoadsComponent],
  providers: [
    //{ provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
  ]
})
export class SeismicLoadsModule {}
