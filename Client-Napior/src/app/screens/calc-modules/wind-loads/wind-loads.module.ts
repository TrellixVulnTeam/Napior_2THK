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
  MatTabsModule,
} from '@angular/material';

// Self-made components and services
import { WindLoadsComponent } from './wind-loads.component';
import { WindGraphicsComponent } from './wind-graphics/wind-graphics.component';
import { WindCalculationInfoComponent } from './wind-inputs/wind-calculation-info/wind-calculation-info.component';
import { WindBuildingCriteriaComponent } from './wind-inputs/wind-building-criteria/wind-building-criteria.component';
import { WindSiteCriteriaComponent } from './wind-inputs/wind-site-criteria/wind-site-criteria.component';
import { WindComponentsCladdingComponent } from './wind-inputs/wind-components-cladding/wind-components-cladding.component';
import { WindResultsComponent } from './wind-results/wind-results.component';
import { WindReportComponent } from './wind-results/wind-report/wind-report.component';
import { WindGraphicsControlsComponent } from './wind-graphics/wind-graphics-controls/wind-graphics-controls.component';

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
    WindLoadsComponent,
    WindGraphicsComponent,
    WindCalculationInfoComponent,
    WindBuildingCriteriaComponent,
    WindSiteCriteriaComponent,
    WindComponentsCladdingComponent,
    WindResultsComponent,
    WindReportComponent,
    WindGraphicsControlsComponent,
  ],
  exports: [WindLoadsComponent],
})
export class WindLoadsModule { }
