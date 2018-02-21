// @angular modules.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppModule } from '../../../app.module';

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
  MatFormFieldModule,
  //MATERIAL_COMPATIBILITY_MODE,
  MatTabsModule
} from '@angular/material';


// Self-made components and services
import { InputTabsComponent } from '../general/input-tabs/input-tabs.component';
import { InputsComponent } from '../general/inputs/inputs.component';
import { ResultsComponent } from '../general/results/results.component';
import { GraphicsResultsContainerComponent } from '../general/graphics-results-container/graphics-results-container.component';
import { DynamicTableComponent } from '../general/dynamic-table/dynamic-table.component';
import { MathDirective } from '../general/report/math.directive';
import { SanitizeHTMLPipe } from '../general/report/sanitize-html.pipe';
import { ReportComponent } from '../general/report/report.component';
import { GenericDialogService } from '../general/generic-dialog/generic-dialog.service';
import { InputTabsService } from '../general/input-tabs/input-tabs.service';
import { MathLineDirective } from './report/math-line.directive';
import { HelpTipComponent } from './help-tip/help-tip.component';
import { GraphicsControlsComponent } from './graphics/graphics-controls/graphics-controls.component';
import { NapiorInputDirective } from './inputs/napior-input.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
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
    MatTabsModule,
    MatFormFieldModule,
    ResizableModule,
    ClickOutsideModule,
  ],
  declarations: [
    InputTabsComponent,
    InputsComponent,
    ResultsComponent,
    GraphicsResultsContainerComponent,
    DynamicTableComponent,
    MathDirective,
    SanitizeHTMLPipe,
    ReportComponent,
    MathLineDirective,
    HelpTipComponent,
    GraphicsControlsComponent,
    NapiorInputDirective,
  ],
  exports: [
    InputTabsComponent,
    InputsComponent,
    ResultsComponent,
    GraphicsResultsContainerComponent,
    DynamicTableComponent,
    MathDirective,
    MathLineDirective,
    SanitizeHTMLPipe,
    ReportComponent,
    HelpTipComponent,
    GraphicsControlsComponent,
    NapiorInputDirective
  ],
  providers: [
    //{ provide: MATERIAL_COMPATIBILITY_MODE, useValue: true },
    GenericDialogService,
    InputTabsService
  ]
})
export class GeneralCalcModule { }
