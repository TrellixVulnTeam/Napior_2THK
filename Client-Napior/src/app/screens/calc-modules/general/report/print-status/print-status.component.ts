import { Component, OnInit } from '@angular/core';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-print-status',
  templateUrl: './print-status.component.html',
  styleUrls: ['./print-status.component.css'],
  providers: [PrintService]
})
export class PrintStatusComponent implements OnInit {

  constructor( public pr: PrintService ) { }

  ngOnInit() {
    setTimeout(()=>{this.pr.printReport()}, 1000) 
  }

}
