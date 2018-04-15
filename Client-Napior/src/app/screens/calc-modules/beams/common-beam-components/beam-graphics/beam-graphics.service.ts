import { Injectable } from '@angular/core';
import { GraphicsService } from '../../../general/graphics/graphics.service';
import { Story, Ground, HorizDimension, GraphicInput, Text, Arrow, VertDimension } from '../../../general/graphics/svg-elements/svg-classes';


@Injectable()
export class BeamGraphicsService {

  public buildingWidth: number;
  public buildingHeight: number;
  public inputs;
  public results;
  public calculationStatus;
  public graphicTextArray: string[] = [];
  public heightInputArray: Object[] = [];
  public type: string;
  public textAdjustment: number;

  constructor(public gr: GraphicsService) { }

  //Method to initialize graphic with scales, cameraShifts and other miscellaneous properties
  initGraphic() {
    this.gr.drawScene(); // Draw the scene.
  }

  drawGraphic(options) {
    this.initGraphic();
    for(let i=0; i<this.inputs.spans.length; i++){
      this.drawSpan(i);
    }
  }

  drawSpan(i){
    this.gr.scene.rect(100,100).move(110*i,0);
  }
}
