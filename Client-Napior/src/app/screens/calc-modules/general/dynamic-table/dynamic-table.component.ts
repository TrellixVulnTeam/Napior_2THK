import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
//Dynamic table component. Bound matrix of data, ability to add/delete rows, editable cells.
export class DynamicTableComponent implements OnInit {

  @Input() headers: string[];
  @Input() tableData: any[]; //List of sublists. sublists represent columns.

  public colStyle: {};
  
  //Function to add story to table.
  addStory(): void {
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.headers[i] == 'Story') {
        this.tableData[i].push(this.tableData[i].length+1);
      } else {
        this.tableData[i].push(this.tableData[i].slice(-1)[0]);
      }
    }
    setTimeout(()=>{this.cd.detectChanges()},150);
  }
  //Function to delete story from table.
  deleteStory(j): void {
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i].splice(j, 1);
    }
    this.cd.detectChanges();
    setTimeout(()=>{this.cd.detectChanges()},150);
  }
  
  parseTableData(j,i){
    console.log(this.headers[j]);
    console.log(this.tableData[j][i]);
    if (this.headers[j] != 'Story' && this.headers[j] != 'Component Name'){
      this.tableData[j][i] = parseFloat(this.tableData[j][i])
    }
    console.log(this.tableData[j][i]);
  }

  constructor(public cd:ChangeDetectorRef) {
  }

  setColumnWidth(){
    const colWidth = 90/this.headers.length;
    this.colStyle = {
      'width': colWidth+'%'
    }
  }

  ngOnInit() {
    //First column is kept blank due to unsolved issue with ngModel.
    let unshiftArr = Array(this.tableData[0].length);
    this.tableData.unshift(unshiftArr);
    this.headers.unshift(" ");
    this.setColumnWidth();
  }

}
