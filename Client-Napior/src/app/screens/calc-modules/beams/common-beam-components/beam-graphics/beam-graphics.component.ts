import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import { GraphicsService } from '../../../general/graphics/graphics.service';
import { InputChangeService } from '../../../general/inputs/input-change.service';
import { BeamGraphicsService } from './beam-graphics.service';
import { debounceTime } from 'rxjs/operators';
import { GraphicInput } from '../../../general/graphics/svg-elements/svg-classes';

@Component({
  selector: 'app-beam-graphics',
  templateUrl: './beam-graphics.component.html',
  styleUrls: ['./beam-graphics.component.css'],
  providers: [
    BeamGraphicsService,
    GraphicsService
  ]
})
export class BeamGraphicsComponent implements OnInit {

  @Input() graphicControl;
  @Input() type;
  @Input() width;
  @Input() height;
  @Input() beamType;
  @ViewChild('svgScene') svgElement;
  private calcSubscription;
  private inputsChangeSubscription;

  constructor(
    public beamGraphic: BeamGraphicsService,
    public calc: RunCalcService,
    public inputs: InputChangeService) {
      this.beamGraphic = beamGraphic;
    }
  
  drawBeamGraphic(){
    this.beamGraphic.inputs = this.calc.inputs;
    this.beamGraphic.results = this.calc.results;
    this.beamGraphic.calculationStatus = this.calc.calculationStatus;
    this.beamGraphic.type = this.type;
    this.beamGraphic.gr.width = this.width; //Set the width of the scene based on the graphic container.
    this.beamGraphic.gr.height = this.height; //Set the height of the scene based on the graphic container.
    this.beamGraphic.gr.svgElement = this.svgElement.nativeElement; //Send svg scene element-reference to graphic service.
    this.beamGraphic.drawGraphic(this.graphicControl);
  }

  ngOnInit() {
    this.calcSubscription = this.calc.ranCalc$.subscribe(
      onRun => {
        this.drawBeamGraphic();
      }
    );
    this.inputsChangeSubscription = this.inputs.inputChange$.pipe(debounceTime(0)).subscribe(
      graphic => {
        console.log('draw')
        this.drawBeamGraphic();
      }
    )
  }
  
  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.drawBeamGraphic();
    }, this.beamGraphic.gr.typeTimeout['type']);
  }

  ngOnDestroy() {
    this.calcSubscription.unsubscribe();
    this.inputsChangeSubscription.unsubscribe();
  }

}
