import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { RunCalcService } from '../../general/run-calc/run-calc.service';
import { GraphicsService } from '../../general/graphics/graphics.service';
import { InputChangeService } from '../../general/inputs/input-change.service';
import { SnowGraphicsService } from './snow-graphics.service';
import { debounceTime } from 'rxjs/operators';
import { GraphicInput } from '../../general/graphics/svg-elements/svg-classes';

@Component({
  selector: 'app-snow-graphics',
  templateUrl: './snow-graphics.component.html',
  styleUrls: ['./snow-graphics.component.css'],
  providers: [
    SnowGraphicsService,
    GraphicsService
  ]
})
export class SnowGraphicsComponent implements OnInit {

  @Input() graphicControl;
  @Input() storyChange;
  @Input() type;
  @Input() width;
  @Input() height;
  @ViewChild('svgScene') svgElement;
  private calcSubscription;
  private inputsChangeSubscription;
  public angleText;
  public eaveToRidgeText;
  public upperRoofInputText;
  public lowerRoofInputText;
  public stepHeightText;

  constructor(
    public snowGraphic: SnowGraphicsService,
    public calc: RunCalcService,
    public cd: ChangeDetectorRef,
    public inputs: InputChangeService
  ) {
    this.snowGraphic = snowGraphic
  }

  drawSnowGraphic(){
    this.snowGraphic.inputs = this.calc.inputs;
    this.snowGraphic.results = this.calc.results;
    this.snowGraphic.calculationStatus = this.calc.calculationStatus;
    this.snowGraphic.type = this.type;
    this.snowGraphic.gr.width = this.width; //Set the width of the scene based on the graphic container.
    this.snowGraphic.gr.height = this.height; //Set the height of the scene based on the graphic container.
    this.snowGraphic.gr.svgElement = this.svgElement.nativeElement; //Send svg scene element-reference to graphic service.
    this.snowGraphic.drawGraphic(this.graphicControl);
    
    this.angleText = this.snowGraphic.angleText;
    this.eaveToRidgeText = this.snowGraphic.eaveToRidgeText;
    this.upperRoofInputText = this.snowGraphic.upperRoofInputText;
    this.lowerRoofInputText = this.snowGraphic.lowerRoofInputText;
    this.stepHeightText = this.snowGraphic.stepHeightText;
  }

  ngOnInit() {
    
    this.angleText = new GraphicInput(this.snowGraphic.gr, 0, 0, 0, '', '');
    this.eaveToRidgeText = new GraphicInput(this.snowGraphic.gr, 0, 0, 0, '', '');
    this.upperRoofInputText = new GraphicInput(this.snowGraphic.gr, 0, 0, 0, '', '');
    this.lowerRoofInputText = new GraphicInput(this.snowGraphic.gr, 0, 0, 0, '', '');
    this.stepHeightText = new GraphicInput(this.snowGraphic.gr, 0, 0, 0, '', '');

    this.calcSubscription = this.calc.ranCalc$.subscribe(
      onRun => {
        this.drawSnowGraphic();
      }
    );
    this.inputsChangeSubscription = this.inputs.inputChange$.pipe(debounceTime(0)).subscribe(
      graphic => {
        this.drawSnowGraphic();
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.drawSnowGraphic();
    }, this.snowGraphic.gr.typeTimeout['type']);
  }

  ngOnDestroy() {
    this.calcSubscription.unsubscribe();
    this.inputsChangeSubscription.unsubscribe();
  }

}
