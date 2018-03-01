import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TryitService {

  public goToCreate = false;

  constructor(private router: Router) {}


}
