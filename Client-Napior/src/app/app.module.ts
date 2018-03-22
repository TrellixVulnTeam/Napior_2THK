// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResizableModule } from 'angular-resizable-element';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatSlideToggleModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
//import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { ClickOutsideModule } from 'ng-click-outside';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
// import * as Rollbar from 'rollbar';
import 'hammerjs';
import 'katex';

// Components and Services
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HomeComponent } from './screens/home/home.component';
import { SaveLoadComponent } from './screens/calc-modules/general/save-load/save-load.component';
import { SaveLoadService } from './screens/calc-modules/general/save-load/save-load.service';
import { GenericDialogComponent } from './screens/calc-modules/general/generic-dialog/generic-dialog.component';
import { AuthService } from './common/auth.service';
import { RtdbService } from './common/rtdb.service';
import { RollbarService } from './common/rollbar.service';
import { rollbarFactory } from './common/rollbar.service';
import { CheckPaymentService } from './common/check-payment.service';
import { LoginComponent } from './screens/login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ForgotPasswordComponent } from './screens/login/forgot-password/forgot-password.component';
import { AccountSettingsComponent } from './screens/account-settings/account-settings.component';
import { SubscriptionComponent } from './screens/subscription/subscription.component';
import { SplashComponent } from './screens/splash/splash.component';
import { TryitService } from './screens/splash/tryit.service';
import { UserInterfaceDialogComponent } from './screens/splash/user-interface-dialog/user-interface-dialog.component';
import { ReportDialogComponent } from './screens/splash/report-dialog/report-dialog.component';
import { CloudDialogComponent } from './screens/splash/cloud-dialog/cloud-dialog.component';
import { TermsPrivacyComponent } from './common/terms-privacy/terms-privacy.component';
import { PrintStatusComponent } from './screens/calc-modules/general/report/print-status/print-status.component';
import { HelpDialogComponent } from './screens/calc-modules/general/help-tip/help-dialog/help-dialog.component';
import { LoginCardsService } from './screens/login/login-cards.service';
import { BeamCalculationInfoComponent } from './screens/calc-modules/beams/common-beam-components/beam-calculation-info/beam-calculation-info.component';
import { BeamSpansComponent } from './screens/calc-modules/beams/common-beam-components/beam-spans/beam-spans.component';
import { BeamLoadsComponent } from './screens/calc-modules/beams/common-beam-components/beam-loads/beam-loads.component';
import { BeamLoadCombosComponent } from './screens/calc-modules/beams/common-beam-components/beam-load-combos/beam-load-combos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    SaveLoadComponent,
    GenericDialogComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AccountSettingsComponent,
    SubscriptionComponent,
    SplashComponent,
    UserInterfaceDialogComponent,
    ReportDialogComponent,
    CloudDialogComponent,
    TermsPrivacyComponent,
    PrintStatusComponent,
    HelpDialogComponent
  ],
  imports: [
    BrowserModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatCardModule,
    ResizableModule,
    AngularSvgIconModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1OHNGDlf4L769UocCrq6u2fhkbtM-z9Y'
    }),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    HttpModule,
    ClickOutsideModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  entryComponents: [
    SaveLoadComponent,
    GenericDialogComponent,
    ForgotPasswordComponent,
    UserInterfaceDialogComponent,
    CloudDialogComponent,
    ReportDialogComponent,
    TermsPrivacyComponent,
    PrintStatusComponent,
    HelpDialogComponent
  ],
  providers: [
    TryitService,
    SaveLoadService,
    AuthService,
    RtdbService,
    CheckPaymentService,
    AngularFireAuth,
    AngularFireDatabase,
    LoginCardsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
