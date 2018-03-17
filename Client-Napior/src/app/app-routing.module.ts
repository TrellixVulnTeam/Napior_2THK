import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { SubscriptionComponent } from './screens/subscription/subscription.component';
import { AccountSettingsComponent } from './screens/account-settings/account-settings.component';
import { AuthGuardsService, PaidGuardsService} from './common/auth-guards.service';
import { SplashComponent } from 'app/screens/splash/splash.component';

import { SeismicLoadsComponent } from './screens/calc-modules/seismic-loads/seismic-loads.component';
import { WindLoadsComponent } from './screens/calc-modules/wind-loads/wind-loads.component';
import { SnowLoadsComponent } from './screens/calc-modules/snow-loads/snow-loads.component';
import { WoodBeamComponent } from './screens/calc-modules/beams/wood-beam/wood-beam.component';

const routes: Routes = [
    {path: '', redirectTo: 'splash', pathMatch: 'full'},
    {path: 'splash', component: SplashComponent},
    {path: 'login', component: LoginComponent },
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardsService]},
    {path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuardsService]},
    {path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuardsService]},
    {path: 'seismic-loads', component: SeismicLoadsComponent, canActivate: [AuthGuardsService, PaidGuardsService]},
    {path: 'wind-loads', component: WindLoadsComponent, canActivate: [AuthGuardsService, PaidGuardsService]},
    {path: 'snow-loads', component: SnowLoadsComponent, canActivate: [AuthGuardsService, PaidGuardsService]},
    {path: 'wood-beam', component: WoodBeamComponent, canActivate: [AuthGuardsService, PaidGuardsService]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthGuardsService, PaidGuardsService ],
})
export class AppRoutingModule {}
