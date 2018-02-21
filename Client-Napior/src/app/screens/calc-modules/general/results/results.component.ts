import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import { RunCalcService } from '../../general/run-calc/run-calc.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  
  style: Object = {};
  resizeWidth: number;
  resizeHeight: number;
  resizeTop: number;
  left: number;
  top: number;
  width: number;
  height: number;
  
  //Function that prevents resizing results box to be to small.
  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 15;
    if (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX) {
      return false;
    }
    return true;
  }
  
  //Function that allows resize of results box.
  onResizeEnd(event: ResizeEvent): void {
    this.left = event.rectangle.left;
    this.top = event.rectangle.top;
    this.width = event.rectangle.width;
    this.height = event.rectangle.height;
    this.style = {
      position: 'fixed',
      left: `${this.left}px`,
      top: `${this.top}px`,
      width: `${this.width}px`,
      height: `${this.height}px`
    };
  }
  
  //Resets results box width on window resize.
  onWindowResize(event): void {
    this.resizeWidth = window.innerWidth - 500;
    this.resizeHeight = 0.25*(window.innerHeight - 60);
    let bottom = window.innerHeight;
    this.resizeTop = bottom - this.resizeHeight;
    this.style = {
      position: 'fixed',
      left: `${this.left}px`,
      top: `${this.resizeTop}px`,
      width: `${this.resizeWidth}px`,
      height: `${this.resizeHeight}px`
    };
  }
  
  constructor( public calc: RunCalcService ) { }

  ngOnInit() {
  }

}
