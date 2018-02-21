import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RtdbService } from './rtdb.service';

@Injectable()
export class AuthGuardsService implements CanActivate {

  public authResponse = true;

  constructor(public authService: AuthService, public router: Router, rtdb: RtdbService) { }

  canActivate() {
    this.checkLogin();

    return this.authResponse;
  }

  checkLogin(): boolean {
    this.authService.user.subscribe(
      (userInfo) => {
        if (userInfo == null) {
          this.authResponse = false;
          this.router.navigate(['/login']);
          return this.authResponse;
        }else {
          this.authResponse = true;
          return this.authResponse;
        }
      }
    );
    return this.authResponse;
  }
}

@Injectable()
export class PaidGuardsService implements CanActivate {

  public authResponse = true;

  constructor(public authService: AuthService, public router: Router, public rtdb: RtdbService) { }

  canActivate() {
    return this.rtdb.companyData.paid;
  }
}
