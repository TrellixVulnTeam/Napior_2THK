import { Injectable } from '@angular/core';
import { GraphicsService } from '../../general/graphics/graphics.service';

@Injectable()
export class SeismicGraphicsService {

  public buildingWidth: number;
  public buildingHeight: number;
  public inputs;
  public results;
  public calculationStatus;
  public graphicTextArray: string[] = [];
  public weightInputArray: Object[] = [];
  public heightInputArray: Object[] = [];
  public type: string;
  private nStories: number;

  constructor(public gr: GraphicsService) { }

  //Method to initialize graphic with scales, cameraShifts and other miscellaneous properties
  initGraphic() {
    this.gr.drawScene(); // Draw the scene.
    this.inputs.storyHeights = this.gr.parseInputArray(this.inputs.storyHeights);
    let cumulativeHeights = [this.inputs.storyHeights[0]];
    for (let i = 1; i < this.inputs.storyHeights.length; i++) {
      let cumHeightI = cumulativeHeights[i - 1] + this.inputs.storyHeights[i];
      cumulativeHeights.push(cumHeightI);
    };
    this.inputs.storyCumulativeHeights = cumulativeHeights;

    
    this.nStories = this.inputs.storyCumulativeHeights.length;
    this.buildingWidth = 30;
    this.buildingHeight = this.inputs.storyCumulativeHeights[this.nStories - 1];

    //Scale and camerashift.
    this.gr.horizontalScale = this.gr.width / this.buildingWidth * 0.25;
    let asymptoticScale = Math.atan(0.3 * this.nStories + 0.2) * 0.7; //Function that allows building height to increase while asymptotically approaching max window height.
    this.gr.verticalScale = 0.72 * this.gr.height / this.buildingHeight * asymptoticScale;
    this.gr.verticalCameraShift = this.buildingHeight / 2;

    //clear old text.
    this.graphicTextArray = [];
    this.weightInputArray = [];
    this.heightInputArray = [];

  }

  drawGraphic() {
    this.initGraphic();

    //Draw inputs.
    //Draw Ground.
    let ground = new Ground(this.gr, this.buildingWidth)
    ground.drawGround();

    //Draw elements for each story.
    for (let i = 0; i < this.inputs.storyHeights.length; i++) {

      //Draw story geometry.
      let story = new SeismicStory(this.gr, this.inputs.storyHeights[i], this.buildingWidth, this.inputs.storyCumulativeHeights[i]);
      story.drawStory();

      //Draw story dimension.
      let dimension = new Dimension(this.gr, this.inputs.storyHeights[i], this.buildingWidth, this.inputs.storyCumulativeHeights[i]);
      dimension.drawDimension();
      let dimensionVertLoc = this.inputs.storyCumulativeHeights[i] - this.inputs.storyHeights[i] / 2 + 1;
      let dimensionPrefix = ``;
      let dimensionSuffix = ` ft`;
      let dimensionTextWidth = 10;
      let dimensionInputI = new GraphicInput(this.gr, this.buildingWidth / 2 + 9.5, dimensionVertLoc, dimensionTextWidth, dimensionPrefix, dimensionSuffix);
      this.heightInputArray.push(dimensionInputI);

      //Add weight inputs.
      let weightPrefix = `w<sub>${this.inputs.storyNames[i]}</sub> = `;
      let weightSuffix = ' kips';
      let weightTextWidth = this.gr.x(this.buildingWidth / 2) - this.gr.x(-this.buildingWidth / 2);
      let weightInputI = new GraphicInput(this.gr, -this.buildingWidth / 2, this.inputs.storyCumulativeHeights[i], weightTextWidth, weightPrefix, weightSuffix);
      this.weightInputArray.push(weightInputI);

    };

    //Draw results
    if(this.calculationStatus.haveResults == true){
      
      //Draw story forces
      let maxForce = Math.max(...this.results.Story_Forces);
      let arrowNumber = Math.min(this.results.Story_Forces.length, this.inputs.storyHeights.length)
      for (let i = 0; i < arrowNumber; i++) {
        //Position for ui or report.
        let locationAdjustments = {
          'ui': {
            'arrowX': this.gr.x(-15) - 150,
            'arrowY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
            'arrowTextX': this.gr.x(-15) - 150,
            'arrowTextY': this.gr.y(this.inputs.storyCumulativeHeights[i]) -12,
            'textWidth': 150
          },
          'report': {
            'arrowX': this.gr.x(-40),
            'arrowY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
            'arrowTextX': this.gr.x(-38),
            'arrowTextY': this.gr.y(this.inputs.storyCumulativeHeights[i])-5,
            'textWidth': (window.innerWidth - 500)*0.07
          }
        }
        //Draw arrow.
        let storyForceArrowI = new Arrow(
          this.gr,
          locationAdjustments[this.type]['arrowX'],
          locationAdjustments[this.type]['arrowY'],
          this.gr.xLength(Math.max(12*this.results.Story_Forces[i]/maxForce, 0.3)),
          Math.max(0.0014 * this.gr.height*this.results.Story_Forces[i]/maxForce, 0.0007* this.gr.height),
          2,
          180,
          '#3c5c6c');
        storyForceArrowI.drawArrow();
        
        //Draw story force text.
        let storyForceTextI = new Text(
          this.gr,
          locationAdjustments[this.type]['arrowTextX'],
          locationAdjustments[this.type]['arrowTextY'],
          `<div style="color: #3c5c6c; width:${locationAdjustments[this.type]['textWidth']}px; text-align: center">
              <span>F<sub>${this.inputs.storyNames[i]}</sub> = ${this.results.Story_Forces[i]} kips</span>
            </div>`)
        let storyForceTextIString = storyForceTextI.drawText();
        this.graphicTextArray.push(storyForceTextIString);
      }
  
      let baseShearArrow = new Arrow(
        this.gr,
        this.gr.x(0) - this.gr.xLength(18) / 2,
        this.gr.y(0) + Math.min(80, 0.12 * this.gr.height),
        this.gr.xLength(18),
        0.0014 * this.gr.height,
        2,
        0,
        '#36AE74');
      baseShearArrow.drawArrow();

      let baseShearText = new Text(
        this.gr,
        this.gr.x(-15) ,
        this.gr.y(0) + Math.min(80, 0.06 * this.gr.height),
        `<div style="color: #36AE74; width:${this.gr.xLength(30)}px; text-align: center">
            <span>V = ${this.results.V} kips</span>
          </div>`);
      let baseShearTextString = baseShearText.drawText();
      this.graphicTextArray.push(baseShearTextString);
    }
    

  }

  changeInput() {
    this.drawGraphic()
  }

  parseInputArray(array) {
    for (let i = 0; i < array.length; i++) {
      let parsedElement = parseFloat(array[i]);
      array[i] = parsedElement;
    }
    return array;
  }

  
}

class Arrow {

  drawArrow() {

    // Draw arrow shaft.
    let arrowLength: number = this.length;
    let X0: number = this.x + Math.min(0, arrowLength * Math.cos(this.angle * 3.14159 / 180)); //Global x-coord i.e. location of arrow in scene.
    let Y0: number = this.y - Math.max(0, arrowLength * Math.sin(this.angle * 3.14159 / 180)); //Global y-coord i.e. location of arrow in scene.
    let x0: number = this.gr.x(0);
    let y0: number = this.gr.y(0);
    let x1: number = x0 + arrowLength * Math.cos(this.angle * 3.14159 / 180); //Tail location: function of length and angle.
    let y1: number = y0 - arrowLength * Math.sin(this.angle * 3.14159 / 180); //Tail location: function of length and angle.

    this.gr.scene.line(x0, y0, x1, y1)
      .move(X0, Y0)
      .stroke({ color: this.color, width: this.lineWeight }).fill('none')

    // Draw arrow head (two barbs)
    let barbLength: number = 30 * this.headSize;
    let barbAngles: number[] = [-18, 18];
    barbAngles.forEach((barbAngle) => {
      let rotatedBarbAngle: number = barbAngle + this.angle;
      let XBarb: number = X0 - Math.min(0, arrowLength * Math.cos(this.angle * 3.14159 / 180)) + Math.min(0, barbLength * Math.cos(rotatedBarbAngle * 3.14159 / 180));
      let YBarb: number = Y0 + Math.max(0, arrowLength * Math.sin(this.angle * 3.14159 / 180)) - Math.max(0, barbLength * Math.sin(rotatedBarbAngle * 3.14159 / 180));
      let x0barb: number = this.gr.xC(0);
      let y0barb: number = this.gr.yC(0);
      let x1barb: number = x0barb + barbLength * Math.cos(rotatedBarbAngle * 3.14159 / 180);
      let y1barb: number = y0barb - barbLength * Math.sin(rotatedBarbAngle * 3.14159 / 180);

      this.gr.scene.line(x0barb, y0barb, x1barb, y1barb)
        .move(XBarb, YBarb)
        .stroke({ color: this.color, width: this.lineWeight }).fill('none');
    })

  }

  constructor(
    private gr: GraphicsService,
    public x: number,
    public y: number,
    public length: number,
    public headSize: number,
    public lineWeight: number,
    public angle: number,
    public color: string,
  ) { }
}

class SeismicStory {

  drawStory() {
    this.gr.scene.polyline([this.gr.x(-this.width / 2), this.gr.y(0), this.gr.x(-this.width / 2), this.gr.y(this.height), this.gr.x(this.width / 2), this.gr.y(this.height), this.gr.x(this.width / 2), this.gr.y(0)])
      .move(this.gr.x(-this.width / 2), this.gr.y(this.cumulativeHeight))
      .stroke({ color: 'black', width: 2 }).fill('none');
  }

  constructor(private gr: GraphicsService, public height: number, public width: number, public cumulativeHeight: number) { }
}

class Ground {

  drawGround() {
    //Main ground line.
    this.gr.scene.line(this.gr.x(-this.width / 2 - 5), this.gr.y(0), this.gr.x(this.width / 2 + 5), this.gr.y(0))
      .move(this.gr.x(-this.width / 2 - 5), this.gr.y(0))
      .stroke({ color: '#c1926b', width: 2 }).fill('none');
    //Three hatch lines.
    let groundHatchX = this.gr.xC(0) + this.gr.width * 0.01;
    let groundHatchY = this.gr.yC(0) - this.gr.width * 0.02;
    this.gr.scene.line(this.gr.xC(0), this.gr.yC(0), groundHatchX, groundHatchY)
      .move(this.gr.x(-this.width / 2), this.gr.y(0))
      .stroke({ color: '#c1926b', width: 2 }).fill('none');
    this.gr.scene.line(this.gr.xC(0), this.gr.yC(0), groundHatchX, groundHatchY)
      .move(this.gr.x(-this.width / 2) + 20, this.gr.y(0))
      .stroke({ color: '#c1926b', width: 2 }).fill('none');
    this.gr.scene.line(this.gr.xC(0), this.gr.yC(0), groundHatchX, groundHatchY)
      .move(this.gr.x(-this.width / 2) + 40, this.gr.y(0))
      .stroke({ color: '#c1926b', width: 2 }).fill('none');
  }

  constructor(private gr: GraphicsService, public width: number) { }
}

class Dimension {

  drawDimension() {
    let dashHorizShift = this.gr.x(0) - this.gr.xC(-5);
    let dashVertShift = this.gr.yC(0) - this.gr.yC(-4);
    //Draw main dimension line.
    this.gr.scene.line(this.gr.x(0), this.gr.y(0), this.gr.x(0), this.gr.y(this.height))
      .move(this.gr.x(this.width / 2 + 8), this.gr.y(this.cumulativeHeight))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw top dash
    this.gr.scene.line(this.gr.xC(-5), this.gr.yC(0), this.gr.xC(5), this.gr.yC(0))
      .move(this.gr.x(this.width / 2 + 8) - dashHorizShift, this.gr.y(this.cumulativeHeight))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw bottom dash
    this.gr.scene.line(this.gr.xC(-5), this.gr.yC(0), this.gr.xC(5), this.gr.yC(0))
      .move(this.gr.x(this.width / 2 + 8) - dashHorizShift, this.gr.y(this.cumulativeHeight - this.height))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw top tick
    this.gr.scene.line(this.gr.xC(-5), this.gr.yC(-4), this.gr.xC(5), this.gr.yC(4))
      .move(this.gr.x(this.width / 2 + 8) - dashHorizShift, this.gr.y(this.cumulativeHeight) + dashVertShift)
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw bottom tick
    this.gr.scene.line(this.gr.xC(-5), this.gr.yC(-4), this.gr.xC(5), this.gr.yC(4))
      .move(this.gr.x(this.width / 2 + 8) - dashHorizShift, this.gr.y(this.cumulativeHeight - this.height) + dashVertShift)
      .stroke({ color: 'black', width: 1 }).fill('none');
  }

  constructor(private gr: GraphicsService, public height: number, public width: number, public cumulativeHeight: number) { }

}

class Text {

  drawText() {
    let htmlString = `<div style="position: relative; top: ${this.y}px; left: ${this.x}px ">${this.html}</div>`;
    return htmlString;
  }

  constructor(
    private gr: GraphicsService,
    public x: number,
    public y: number,
    public html: string
  ) { }
}

class GraphicInput {

  public style: {};

  constructor(private gr: GraphicsService, public x: number, public y: number, public width: number, public prefix: string, public suffix: string) {
    this.style = {
      position: 'relative',
      left: `${this.gr.x(this.x)}px`,
      top: `${this.gr.y(this.y)}px`,
      width: `${this.width}px`,
      margin: '0px 0px 0px 0px',
    }
  }

}

