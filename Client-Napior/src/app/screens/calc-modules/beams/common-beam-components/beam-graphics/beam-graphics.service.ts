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

    let spanLength = 0;
    this.inputs.spans.map((span)=>{
      spanLength += parseFloat(span.length);
      console.log(spanLength);
    })
    let asymptoticScale = Math.atan(0.15 * spanLength + 0.1) * 0.45; //Function that allows span length to increase while asymptotically approaching max window width.
    this.gr.horizontalScale = this.gr.width / spanLength * asymptoticScale;;
    this.gr.verticalScale = this.gr.horizontalScale;
    this.gr.horizontalCameraShift = spanLength/2;
  }

  drawGraphic(options) {
    this.initGraphic();
    var cumulativeBeamLength = 0
    for(let i=0; i<this.inputs.spans.length; i++){
      this.drawSpan(i, cumulativeBeamLength);
      cumulativeBeamLength += parseFloat(this.inputs.spans[i].length);
    }
  }

  drawSpan(i, beamXLocation){
    const length = this.inputs.spans[i].length;
    const beam = this.gr.scene.rect(this.gr.xLength(length),this.gr.yLength(10/12))
      .move(this.gr.x(beamXLocation), this.gr.y(0))
      .style('cursor', 'pointer')
      .fill({ color: '#EAC78D'})
      .stroke({ color: '#AE7D2C', width: 2 });

    beam.mouseover(()=>{
      beam.stroke({ color: '#AE7D2C', width: 3 }).fill({ color: '#ffd899'});
    })
    beam.mouseout(()=>{
      beam.stroke({ color: '#AE7D2C', width: 2 }).fill({ color: '#EAC78D'});
    })
  }
}
