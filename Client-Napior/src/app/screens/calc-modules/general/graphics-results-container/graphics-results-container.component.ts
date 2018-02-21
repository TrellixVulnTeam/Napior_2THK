import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphics-results-container',
  templateUrl: './graphics-results-container.component.html',
  styleUrls: ['./graphics-results-container.component.css'],
  host:{
    "id":"results-graphics",
  }
})
export class GraphicsResultsContainerComponent implements OnInit {

  @Input() resultsOrReport: string;

  constructor() { }

  ngOnInit() {
  }

}
