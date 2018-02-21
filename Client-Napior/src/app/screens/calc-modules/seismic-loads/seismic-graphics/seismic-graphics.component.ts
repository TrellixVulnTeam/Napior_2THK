import { Component, OnInit, OnChanges, Input, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SeismicGraphicsService } from './seismic-graphics.service';
import { RunCalcService } from '../../general/run-calc/run-calc.service';
import { GraphicsService } from '../../general/graphics/graphics.service';

@Component({
  selector: 'app-seismic-graphics',
  templateUrl: './seismic-graphics.component.html',
  styleUrls: ['./seismic-graphics.component.css'],
  providers: [
    SeismicGraphicsService,
    GraphicsService
  ]
})
export class SeismicGraphicsComponent implements OnInit {
  @Input() storyChange;
  @Input() type;
  @Input() width;
  @Input() height;
  @ViewChild('svgScene') svgElement;
  private calcSubscription;

  //Graphic draws ON CHANGES and on changeInput event on app-graphics.
  drawSeismicGraphic() {
    this.seismicGraphic.inputs = this.calc.inputs;
    this.seismicGraphic.results = this.calc.results;
    this.seismicGraphic.calculationStatus = this.calc.calculationStatus;
    this.seismicGraphic.type = this.type;
    this.seismicGraphic.gr.width = this.width; //Set the width of the scene based on the graphic container.
    this.seismicGraphic.gr.height = this.height; //Set the height of the scene based on the graphic container.
    this.seismicGraphic.gr.svgElement = this.svgElement.nativeElement; //Send svg scene element reference to graphic service.
    this.seismicGraphic.drawGraphic();
  }

  constructor(
    public seismicGraphic: SeismicGraphicsService,
    public calc: RunCalcService,
    public cd: ChangeDetectorRef
  ) {
    this.seismicGraphic = seismicGraphic;
  }

  ngOnInit() {
    this.calcSubscription = this.calc.ranCalc$.subscribe(
      onRun => {
        this.drawSeismicGraphic();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.drawSeismicGraphic();
    }, this.seismicGraphic.gr.typeTimeout['type']);
  }

  ngOnDestroy() {
    this.calcSubscription.unsubscribe()
  }
}
