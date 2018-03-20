// @angular modules.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppModule } from '../../../../app.module';
import { GeneralCalcModule } from '../../general/general-calc.module';

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
  MatTabsModule,
} from '@angular/material';

// Self-made components and services
import { WoodBeamComponent } from './wood-beam.component';
import { WoodBeamResultsComponent } from './wood-beam-results/wood-beam-results.component';
import { WoodBeamGraphicsComponent } from './wood-beam-graphics/wood-beam-graphics.component';


@NgModule({
  imports: [
    GeneralCalcModule,
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
    ResizableModule,
    ClickOutsideModule,
    MatTabsModule
  ],
  declarations: [
    WoodBeamComponent,
    WoodBeamResultsComponent,
    WoodBeamGraphicsComponent,
  ],
  exports: [WoodBeamComponent],
})
export class WoodBeamModule { }
