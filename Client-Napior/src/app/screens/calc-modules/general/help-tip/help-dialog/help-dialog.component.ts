import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {

  public title: string;
  public image: string;
  public imageStyle: {};
  public text: string;
  public subTitle: string;

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.image = data.image.url;
    this.imageStyle = {
      'height': data.image.height,
      'width': data.image.width
    }
    this.text = data.text;
    this.subTitle = data.subTitle;
   }

  ngOnInit() {
  }

}
