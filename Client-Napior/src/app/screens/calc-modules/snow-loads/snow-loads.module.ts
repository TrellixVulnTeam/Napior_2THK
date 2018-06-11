import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppModule } from '../../../app.module';
import { GeneralCalcModule } from '../general/general-calc.module';

// Imported modules
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
  //MATERIAL_COMPATIBILITY_MODE,
  MatTabsModule,
} from '@angular/material';

// Self-made components and services
import { SnowLoadsComponent } from './snow-loads.component';
import { SnowGraphicsComponent } from './snow-graphics/snow-graphics.component';
import { SnowResultsComponent } from './snow-results/snow-results.component';
import { SnowReportComponent } from './snow-results/snow-report/snow-report.component';
import { SnowBuildingCriteriaComponent } from './snow-inputs/snow-building-criteria/snow-building-criteria.component';
import { SnowCalculationInfoComponent } from './snow-inputs/snow-calculation-info/snow-calculation-info.component';
import { SnowSiteCriteriaComponent } from './snow-inputs/snow-site-criteria/snow-site-criteria.component';

@NgModule({
  imports: [
    GeneralCalcModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatTabsModule
  ],
  declarations: [
    SnowLoadsComponent,
    SnowGraphicsComponent,
    SnowResultsComponent,
    SnowReportComponent,
    SnowBuildingCriteriaComponent,
    SnowCalculationInfoComponent,
    SnowSiteCriteriaComponent
  ],
  exports: [SnowLoadsComponent],
  providers: [
    //{ provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
  ]
})
export class SnowLoadsModule { }
