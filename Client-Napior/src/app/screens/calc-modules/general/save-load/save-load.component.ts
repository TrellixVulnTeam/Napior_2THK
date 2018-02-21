import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'
import { SaveLoadService } from './save-load.service'

@Component({
  selector: 'app-save-load',
  templateUrl: './save-load.component.html',
  styleUrls: ['./save-load.component.css']
})
export class SaveLoadComponent implements OnInit {

  public fileName: string;
  public saveLoad: SaveLoadService;

  public saveCalc(dialogRef, name, data): void{
    console.log(this.data.inputs);
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(data)], {type: 'npr'});
    a.href = URL.createObjectURL(file);
    a.download = `${name}.npr`;
    a.click();
    dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<SaveLoadComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
