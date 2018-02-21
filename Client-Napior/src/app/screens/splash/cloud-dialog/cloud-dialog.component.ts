import { Component, OnInit } from '@angular/core';
import { SplashStylesService } from '../splash-styles.service';

@Component({
  selector: 'app-cloud-dialog',
  templateUrl: './cloud-dialog.component.html',
  styleUrls: ['./cloud-dialog.component.css'],
  providers: [
    SplashStylesService
  ]
})
export class CloudDialogComponent implements OnInit {

  constructor(public splashStyles: SplashStylesService) { }

  ngOnInit() {
  }

}
