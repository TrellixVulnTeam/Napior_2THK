import { Component, OnInit, OnChanges, Input, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { WindGraphicsService } from './wind-graphics.service';
import { RunCalcService } from '../../general/run-calc/run-calc.service';
import { GraphicsService } from '../../general/graphics/graphics.service';

@Component({
  selector: 'app-wind-graphics',
  templateUrl: './wind-graphics.component.html',
  styleUrls: ['./wind-graphics.component.css'],
  providers: [
    WindGraphicsService,
    GraphicsService
  ]
})
export class WindGraphicsComponent implements OnInit {

  @Input() graphicControl;
  @Input() storyChange;
  @Input() type;
  @Input() width;
  @Input() height;
  @ViewChild('svgScene') svgElement;
  private calcSubscription;

  constructor(
    public windGraphic: WindGraphicsService,
    public calc: RunCalcService,
    public cd: ChangeDetectorRef
  ) {
    this.windGraphic = windGraphic;
  }

  drawWindGraphic(){
    this.windGraphic.inputs = this.calc.inputs;
    this.windGraphic.results = this.calc.results;
    this.windGraphic.calculationStatus = this.calc.calculationStatus;
    this.windGraphic.type = this.type;
    this.windGraphic.gr.width = this.width; //Set the width of the scene based on the graphic container.
    this.windGraphic.gr.height = this.height; //Set the height of the scene based on the graphic container.
    this.windGraphic.gr.svgElement = this.svgElement.nativeElement; //Send svg scene element-reference to graphic service.
    this.windGraphic.drawGraphic(this.graphicControl);
  }

  ngOnInit() {
    this.calcSubscription = this.calc.ranCalc$.subscribe(
      onRun => {
        this.drawWindGraphic();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.drawWindGraphic();
    }, this.windGraphic.gr.typeTimeout['type']);
  }

  ngOnDestroy() {
    this.calcSubscription.unsubscribe()
  }

}
