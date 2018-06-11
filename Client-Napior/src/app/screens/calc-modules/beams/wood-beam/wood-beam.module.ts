// @angular modules.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppModule } from '../../../../app.module';
import { GeneralCalcModule } from '../../general/general-calc.module';

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
import {MatExpansionModule} from '@angular/material/expansion';

// Self-made components and services
import { WoodBeamComponent } from './wood-beam.component';
import { WoodBeamResultsComponent } from './wood-beam-results/wood-beam-results.component';
import { WoodBeamGraphicsComponent } from './wood-beam-graphics/wood-beam-graphics.component';
import { WoodBeamSectionsMaterialsComponent } from './wood-beam-inputs/wood-beam-sections-materials/wood-beam-sections-materials.component';
import { BeamCalculationInfoComponent } from '../common-beam-components/beam-calculation-info/beam-calculation-info.component';
import { BeamSpansComponent } from '../common-beam-components/beam-spans/beam-spans.component';
import { BeamLoadsComponent } from '../common-beam-components/beam-loads/beam-loads.component';
import { BeamLoadCombosComponent } from '../common-beam-components/beam-load-combos/beam-load-combos.component';
import { BeamSectionsMaterialsComponent } from '../common-beam-components/beam-sections-materials/beam-sections-materials.component';
import { WoodBeamSectionSettingsComponent } from './wood-beam-inputs/wood-beam-section-settings/wood-beam-section-settings.component';
import { BeamGraphicsComponent } from '../common-beam-components/beam-graphics/beam-graphics.component';
import { BeamGraphicsControlsComponent } from '../common-beam-components/beam-graphics/beam-graphics-controls/beam-graphics-controls.component';


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
    MatTabsModule,
    MatExpansionModule
  ],
  declarations: [
    WoodBeamComponent,
    WoodBeamResultsComponent,
    WoodBeamGraphicsComponent,
    WoodBeamSectionsMaterialsComponent,
    BeamCalculationInfoComponent,
    BeamSpansComponent,
    BeamLoadsComponent,
    BeamLoadCombosComponent,
    BeamSectionsMaterialsComponent,
    WoodBeamSectionSettingsComponent,
    BeamGraphicsComponent,
    BeamGraphicsControlsComponent
  ],
  exports: [WoodBeamComponent],
})
export class WoodBeamModule { }
