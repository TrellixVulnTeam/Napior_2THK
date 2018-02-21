import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@Component({
  selector: 'app-help-tip',
  templateUrl: './help-tip.component.html',
  styleUrls: ['./help-tip.component.css']
})
export class HelpTipComponent implements OnInit {

  @Input() public title: string;
  @Input() public image: string;
  @Input() public text: string;
  @Input() public subTitle: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(HelpDialogComponent, {
      data:{
        title: this.title,
        image: this.image,
        subTitle: this.subTitle,
        text: this.text
      }
    });
  }

  ngOnInit() {
  }

}
