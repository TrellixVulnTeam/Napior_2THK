import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent } from './generic-dialog.component';

@Injectable()
export class GenericDialogService {
  
  public openDialog(contentData) {
    let dialogRef = this.dialog.open(GenericDialogComponent, {
      width: contentData.width,
      height: contentData.height,
      data: contentData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  constructor(public dialog: MatDialog) { }

}
