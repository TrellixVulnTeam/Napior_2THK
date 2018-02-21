import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveLoadComponent } from './save-load.component';

@Injectable()
export class SaveLoadService {

  public openSaveDialog(inputs) {
    let dialogRef = this.dialog.open(SaveLoadComponent, {
      width: '500px',
      height: '230px',
      data: { inputs: inputs }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  constructor(public dialog: MatDialog) { }

}
