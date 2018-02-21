import { Injectable } from '@angular/core';
import { GraphicsService } from '../../general/graphics/graphics.service';
import { Story, Ground, HorizDimension, GraphicInput, Text, Arrow, VertDimension } from '../../general/graphics/svg-elements/svg-classes';

@Injectable()
export class SnowGraphicsService {

  public buildingWidth: number;
  public buildingHeight: number;
  public inputs;
  public results;
  public calculationStatus;
  public graphicTextArray: string[] = [];
  public heightInputArray: Object[] = [];
  public type: string;
  public textAdjustment: number;

  public xLeft: number;
  public yLeft: number;
  public xMiddleUp: number;
  public yMiddleUp: number;
  public xMiddleDown: number;
  public yMiddleDown: number;
  public xRight: number;
  public yRight: number;
  public peakHeight: number;
  public maxEaveToPeak: number;
  public slope: number;
  public radSlope: number;
  public maxSlope: number;
  public lengthUpper: number;
  public lengthLower: number;
  public stepHeight: number;

  public angleText: GraphicInput;
  public eaveToRidgeText: GraphicInput;
  public upperRoofInputText: GraphicInput;
  public lowerRoofInputText: GraphicInput;
  public stepHeightText: GraphicInput;

  constructor(public gr: GraphicsService) {
  }

  //Method to initialize graphic with scales, cameraShifts and other miscellaneous properties
  initGraphic() {
    this.gr.drawScene(); // Draw the scene.

    this.buildingWidth = 80;
    this.buildingHeight = 15;

    //Scale and camerashift.
    this.gr.horizontalScale = this.gr.width / this.buildingWidth * 0.45;
    this.gr.verticalScale = this.gr.horizontalScale;//0.72 * this.gr.height / this.buildingHeight * asymptoticScale;
    this.gr.verticalCameraShift = 25;
    this.textAdjustment = (this.type === 'ui') ? 22 : (window.innerWidth - 500)*0.008 + 4;

    //clear old text.
    this.graphicTextArray = [];
    this.heightInputArray = [];

    //Initialize geometry properties.
    this.maxEaveToPeak = 30;
    const slopeWidth = (this.inputs.roofType === 'Monoslope') ? this.buildingWidth: this.buildingWidth/2;
    this.maxSlope = Math.atan(this.maxEaveToPeak/slopeWidth);
    this.slope = Math.min(this.maxSlope*180/3.14159, Math.abs(this.inputs.roofSlope));
    this.radSlope = this.slope*3.14159/180;
    this.maxEaveToPeak = 30;
  }

  drawGraphic(options) {
    this.initGraphic();
  //Draw inputs.
    let ground = new Ground(this.gr, this.buildingWidth + 5) //Draw Ground.
    ground.drawGround();
    this.drawBuilding();
    this.drawInputText();
    if(this.inputs.roofType === 'Monoslope') {
      this.drawAngleDimension();
    } else if (this.inputs.roofType === 'Hip/Gable') {
      this.drawAngleDimension();
      this.drawEaveToRidgeDimension();
    } else if (this.inputs.roofType === 'Stepped') {
      this.drawStepLocationDimensions();
      this.drawStepVertDimension();
    }
    
  //Draw results.
    if(this.calculationStatus.haveResults == true){
      if(this.inputs.roofType === 'Monoslope') {
        this.drawSlopeRoofLoad()
      } else if (this.inputs.roofType === 'Hip/Gable') {
        this.drawGableRoofLoad()
      } else if (this.inputs.roofType === 'Stepped') {
        this.drawSteppedRoofLoad()
      } else {
        this.drawFlatRoofLoad();
      }
    }
  }

  drawBuilding(){
    
    let eaveToPeakHeight = 0;
    let yGround: number = this.gr.y(0);
    const slope = Math.min(90, Math.abs(this.inputs.roofSlope));

    if (this.inputs.roofType === 'Flat'){
      this.xLeft = this.gr.x(-this.buildingWidth/2);
      this.yLeft = this.gr.y(this.buildingHeight);
      this.xMiddleUp = this.gr.x(0);
      this.yMiddleUp = this.gr.y(this.buildingHeight);
      this.xMiddleDown = this.gr.x(0);
      this.yMiddleDown = this.gr.y(this.buildingHeight);
      this.xRight = this.gr.x(this.buildingWidth/2);
      this.yRight = this.gr.y(this.buildingHeight);
      this.peakHeight = this.buildingHeight;

    } else if (this.inputs.roofType === 'Monoslope'){
      eaveToPeakHeight = this.buildingWidth*Math.tan(this.radSlope);
      this.xLeft = this.gr.x(-this.buildingWidth/2);
      this.yLeft = this.gr.y(this.buildingHeight);
      this.xMiddleUp = this.gr.x(0);
      this.yMiddleUp = this.gr.y(eaveToPeakHeight/2 + this.buildingHeight);
      this.xMiddleDown = this.gr.x(0);
      this.yMiddleDown = this.gr.y(eaveToPeakHeight/2 + this.buildingHeight);
      this.xRight = this.gr.x(this.buildingWidth/2);
      this.yRight = this.gr.y(eaveToPeakHeight + this.buildingHeight);
      this.peakHeight = this.buildingHeight + eaveToPeakHeight;

    } else if (this.inputs.roofType === 'Hip/Gable'){
      eaveToPeakHeight = this.buildingWidth/2*Math.tan(this.radSlope);
      this.xLeft = this.gr.x(-this.buildingWidth/2);
      this.yLeft = this.gr.y(this.buildingHeight);
      this.xMiddleUp = this.gr.x(0);
      this.yMiddleUp = this.gr.y(eaveToPeakHeight + this.buildingHeight);
      this.xMiddleDown = this.gr.x(0);
      this.yMiddleDown = this.gr.y(eaveToPeakHeight + this.buildingHeight);
      this.xRight = this.gr.x(this.buildingWidth/2);
      this.yRight = this.gr.y(this.buildingHeight);
      this.peakHeight = this.buildingHeight + eaveToPeakHeight;

    } else {
      this.stepHeight = Math.min(parseFloat(this.inputs.stepHeight), 30);
      const trueWidthRatio = (parseFloat(this.inputs.lengthUpperRoof) + parseFloat(this.inputs.lengthLowerRoof))/this.buildingWidth;
      this.lengthUpper = parseFloat(this.inputs.lengthUpperRoof) / trueWidthRatio;
      this.lengthLower = parseFloat(this.inputs.lengthLowerRoof) / trueWidthRatio;
      const middleX = -this.buildingWidth/2 + this.lengthUpper;
      this.xLeft = this.gr.x(-this.buildingWidth/2);
      this.yLeft = this.gr.y(this.buildingHeight + this.stepHeight);
      this.xMiddleUp = this.gr.x(middleX);
      this.yMiddleUp = this.gr.y(this.buildingHeight + this.stepHeight);
      this.xMiddleDown = this.gr.x(middleX);
      this.yMiddleDown = this.gr.y(this.buildingHeight);
      this.xRight = this.gr.x(this.buildingWidth/2);
      this.yRight = this.gr.y(this.buildingHeight);
      this.peakHeight = this.buildingHeight + this.stepHeight;
      
    }
    
    this.gr.scene.polyline([
      this.xLeft, yGround,
      this.xLeft, this.yLeft,
      this.xMiddleUp, this.yMiddleUp,
      this.xMiddleDown, this.yMiddleDown,
      this.xRight, this.yRight,
      this.xRight, yGround
    ])
      .stroke({ color: '#000000', width: 2 }).fill('none')
      .move(this.gr.x(-this.buildingWidth / 2), this.gr.y(this.peakHeight));
  }

  drawAngleDimension(){
    //Draw angle reference line.
    this.gr.scene.line(this.xLeft, this.yLeft, this.gr.x(-this.buildingWidth/2 + 0.33*this.buildingWidth), this.yLeft)
      .stroke({ color: '#000000', width: 1}).fill('none')
      .move(this.xLeft, this.yLeft);
    
    //Draw angle curve line.
    const anglePathX1 = this.gr.x(-this.buildingWidth/2 + 0.25*this.buildingWidth);
    const anglePathY1 = this.yLeft;
    const anglePathX2 = this.gr.x((-this.buildingWidth/2)+((this.buildingWidth*0.25)*Math.cos(this.radSlope)));
    const anglePathY2 = this.gr.y(this.buildingHeight + 0.25*this.buildingWidth*Math.sin(this.radSlope));
    const anglePathBezierX = this.gr.x((-this.buildingWidth/2)+((this.buildingWidth*0.25)*Math.cos(this.radSlope/2)));
    const anglePathBezierY = this.gr.y(this.buildingHeight + 0.25*this.buildingWidth*Math.sin(this.radSlope/2));
    const pathString = "M " + anglePathX1 + "," + anglePathY1 + " Q " + anglePathBezierX + "," + anglePathBezierY + " " + anglePathX2 + "," + anglePathY2; 
    this.gr.scene.path(pathString) //anglePathX1, anglePathY1, anglePathX2, anglePathY2
      .stroke({ color: '#000000', width: 1, dasharray: "2,2" }).fill('none')
    
  }

  drawEaveToRidgeDimension() {
    //Draw eave to ridge dimension line.
    const eaveToRidgeDimension = new HorizDimension(this.gr, this.buildingWidth/2, -this.buildingWidth/2, this.buildingHeight/3);
    eaveToRidgeDimension.drawDimension();
    
  }

  drawStepLocationDimensions() {
    //Draw upper roof dimension line.
    const upperRoofDimension = new HorizDimension(this.gr, this.lengthUpper, -this.buildingWidth/2, this.buildingHeight/3);
    upperRoofDimension.drawDimension();
    
    // Draw lower roof dimension line.
    const lowerRoofDimension = new HorizDimension(this.gr, this.lengthLower, -this.buildingWidth/2 + this.lengthUpper, this.buildingHeight/3);
    lowerRoofDimension.drawDimension();
  }

  drawStepVertDimension() {
    const stepDimension = new VertDimension(this.gr, this.stepHeight, -this.buildingWidth/2 + this.lengthUpper + 4, this.buildingHeight + this.stepHeight);
    stepDimension.drawDimension();
  }

  drawInputText(){
    //Angle input text.
    this.angleText = new GraphicInput(this.gr, -this.buildingWidth/2 + 0.1*this.buildingWidth/2 , this.buildingHeight, 90, '&theta; = ', '&deg;');
    //Eave to ridge distance input text.
    this.eaveToRidgeText = new GraphicInput(this.gr, -this.buildingWidth/4, this.buildingHeight/3, 90, 'W = ', ' ft', this.type, 'bottom', 'center');
    //Upper roof input text.
    this.upperRoofInputText = new GraphicInput(this.gr, -this.buildingWidth/2 + this.lengthUpper/2, this.buildingHeight/3, 90, '', ' ft', this.type, 'bottom', 'center');
    //Upper roof input text.
    this.lowerRoofInputText = new GraphicInput(this.gr, -this.buildingWidth/2 + this.lengthUpper + this.lengthLower/2 , this.buildingHeight/3, 90, '', ' ft', this.type, 'bottom', 'center');
    //Step height input text.
    this.stepHeightText = new GraphicInput(this.gr, -this.buildingWidth/2 + this.lengthUpper + 4, this.buildingHeight + this.stepHeight/2, 90, 'h<sub>c</sub> = ', ' ft', this.type, 'center');
  }

  drawFlatRoofLoad(){
    const flatLoadDepth = 5;
    const flatXLocation = this.gr.x(-this.buildingWidth / 2);
    const flatYLocation = this.gr.y(this.peakHeight + flatLoadDepth + 3);
    this.gr.scene.rect(this.gr.xLength(this.buildingWidth), this.gr.yLength(flatLoadDepth))
      .stroke({color: '#3c5c6c', width: 0})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(flatXLocation, flatYLocation);

    const flatRoofLoadText = new Text(
      this.gr,
      this.gr.x(0) - 90/2,
      flatYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${90}px; text-align: center">
          <span>p<sub>f</sub> = ${this.results.pf} psf</span>
        </div>`)
    const flatRoofLoadTextString = flatRoofLoadText.drawText();
    this.graphicTextArray.push(flatRoofLoadTextString);
  }

  drawSlopeRoofLoad(){
    const slopeLoadDepth = 5;
    const slopeXLocation = this.gr.x(-this.buildingWidth / 2);
    const slopeYLocation = this.gr.y(this.peakHeight + slopeLoadDepth + 3);
    this.gr.scene.rect(this.gr.xLength(this.buildingWidth), this.gr.yLength(slopeLoadDepth))
      .stroke({color: '#3c5c6c', width: 0})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(slopeXLocation, slopeYLocation);

    const slopeRoofLoadText = new Text(
      this.gr,
      this.gr.x(0) - 110/2,
      slopeYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${110}px; text-align: center">
          <span>p<sub>s</sub> = ${this.results.ps} psf</span>
        </div>`)
    const slopeRoofLoadTextString = slopeRoofLoadText.drawText();
    this.graphicTextArray.push(slopeRoofLoadTextString);
  }

  drawGableRoofLoad(){

    const maxLoadGraphicHeight = 10;
    const maxLoad = parseFloat(this.results.pf) + parseFloat(this.results.maxDriftLoad);
    const windwardGraphicHeight = parseFloat(this.results.minDriftLoad) / maxLoad * maxLoadGraphicHeight;
    const leewardGraphicHeight =  parseFloat(this.results.pf) / maxLoad * maxLoadGraphicHeight;
    const surchargeGraphicHeight = parseFloat(this.results.maxDriftLoad) / maxLoad * maxLoadGraphicHeight;
    const maxWGraphic = this.buildingWidth/2;
    const eaveToRidge = parseFloat(this.inputs.distEaveToRidge);
    const surchargeGraphicWidth = parseFloat(this.results.w) / eaveToRidge * maxWGraphic; 
    
    //Draw objects.
    //Draw windward snow load.
    const windwardXLocation = this.gr.x(-this.buildingWidth / 2);
    const windwardYLocation = this.gr.y(this.peakHeight + windwardGraphicHeight + 3);
    this.gr.scene.rect(this.gr.xLength(this.buildingWidth/2), this.gr.yLength(windwardGraphicHeight))
      .stroke({color: 'white', width: 0.3})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(windwardXLocation, windwardYLocation);

    //Draw leeward snow load.
    const leewardXLocation = this.gr.x(0);
    const leewardYLocation = this.gr.y(this.peakHeight + leewardGraphicHeight + 3);
    this.gr.scene.rect(this.gr.xLength(this.buildingWidth/2), this.gr.yLength(leewardGraphicHeight))
      .stroke({color: 'white', width: 0.3})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(leewardXLocation, leewardYLocation);

    //Draw surcharge snow load.
    const surchargeXLocation = this.gr.x(0);
    const surchargeYLocation = this.gr.y(this.peakHeight + leewardGraphicHeight + surchargeGraphicHeight + 3);
    this.gr.scene.rect(this.gr.xLength(surchargeGraphicWidth), this.gr.yLength(surchargeGraphicHeight))
      .stroke({color: 'white', width: 0.3})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(surchargeXLocation, surchargeYLocation);

    //Draw surcharge width dimension line.
    const surchargeWidthDimensionYlocation = this.peakHeight + leewardGraphicHeight + surchargeGraphicHeight + ((this.type === 'ui')? 8 : 11) ;
    const surchargeWidthDimension = new HorizDimension(this.gr, surchargeGraphicWidth, 0, surchargeWidthDimensionYlocation);
    surchargeWidthDimension.drawDimension();

    //Draw text.
    //Windward snow load text.
    const windwardRoofLoadText = new Text(
      this.gr,
      this.gr.x(-this.buildingWidth/4) - 110/2,
      windwardYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${110}px; text-align: center">
          <span>p<sub>d,min</sub> = ${this.results.minDriftLoad} psf</span>
        </div>`)
    const windwardRoofLoadTextString = windwardRoofLoadText.drawText();
    this.graphicTextArray.push(windwardRoofLoadTextString);

     //Leeward snow load text.
     const leewardRoofLoadText = new Text(
      this.gr,
      this.gr.x(surchargeGraphicWidth),
      leewardYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${110}px; text-align: left">
          <span>p<sub>f</sub> = ${this.results.pf} psf</span>
        </div>`)
    const leewardRoofLoadTextString = leewardRoofLoadText.drawText();
    this.graphicTextArray.push(leewardRoofLoadTextString);

    //Surcharge snow load text.
    const surchargeRoofLoadText = new Text(
      this.gr,
      this.gr.x(0),
      surchargeYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${120}px; text-align: left">
          <span>p<sub>d,max</sub> = ${this.results.maxDriftLoad} psf</span>
        </div>`)
    const surchargeRoofLoadTextString = surchargeRoofLoadText.drawText();
    this.graphicTextArray.push(surchargeRoofLoadTextString);

    //Draw surcharge width dimension text.
    const surchargeDimensionText = new Text(
      this.gr,
      this.gr.x(surchargeGraphicWidth/2) - 60 / 2,
      this.gr.y(surchargeWidthDimensionYlocation) - this.textAdjustment,
      `<div style="color: black; width:${60}px; text-align: center">
          <span>${this.results.w}'</span>
        </div>`)
    const surchargeDimensionTextString = surchargeDimensionText.drawText();
    this.graphicTextArray.push(surchargeDimensionTextString);
  }

  drawSteppedRoofLoad(){
    const maxLoadGraphicHeight = 10;
    const maxLoad = parseFloat(this.results.pf) + parseFloat(this.results.maxDriftLoad);
    const flatLoadGraphicHeight = parseFloat(this.results.pf) / maxLoad * maxLoadGraphicHeight;
    const surchargeGraphicHeight = parseFloat(this.results.maxDriftLoad) / maxLoad * maxLoadGraphicHeight;
    const surchargeMinGraphicHeight = parseFloat(this.results.minDriftLoad) / maxLoad * maxLoadGraphicHeight;
    const surchargeGraphicWidth = Math.min(parseFloat(this.results.w), parseFloat(this.inputs.lengthLowerRoof))/(parseFloat(this.inputs.lengthUpperRoof)+parseFloat(this.inputs.lengthLowerRoof)) * this.buildingWidth;

    //Draw objects.
    //Draw flat roof load.
    const flatXLocation = this.gr.x(-this.buildingWidth / 2);
    const flatYLocation = this.gr.y(this.peakHeight + flatLoadGraphicHeight + 3);
    this.gr.scene.rect(this.gr.xLength(this.buildingWidth), this.gr.yLength(flatLoadGraphicHeight))
      .stroke({color: '#3c5c6c', width: 0})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(flatXLocation, flatYLocation);

    //Draw step surcharge.
    const surchargeYLocation = this.gr.y(this.peakHeight + flatLoadGraphicHeight + surchargeGraphicHeight + 3);
    const surchargePolygonString = `${this.gr.x(0)} ${this.gr.y(0)} ${this.gr.x(0)} ${this.gr.y(surchargeGraphicHeight)} ${this.gr.x(surchargeGraphicWidth)} ${this.gr.y(surchargeMinGraphicHeight)} ${this.gr.x(surchargeGraphicWidth)} ${this.gr.y(0)}`;
    this.gr.scene.polygon(surchargePolygonString)
      .stroke({color: 'white', width: 0.3})
      .fill({color: '#3c5c6c'})
      .attr({'fill-opacity': 0.65})
      .move(this.xMiddleUp, surchargeYLocation);

    //Draw surcharge width dimension line.
    const surchargeWidthDimensionYlocation = this.peakHeight + flatLoadGraphicHeight + surchargeGraphicHeight + ((this.type === 'ui')? 8 : 11) ;
    const surchargeWidthDimension = new HorizDimension(this.gr, surchargeGraphicWidth, -this.buildingWidth/2 + this.lengthUpper, surchargeWidthDimensionYlocation);
    surchargeWidthDimension.drawDimension();

    //Draw text.
    //Draw flat roof text.
    const flatRoofLoadText = new Text(
      this.gr,
      this.gr.x(-this.buildingWidth/2),
      flatYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${90}px; text-align: center">
          <span>p<sub>f</sub> = ${this.results.pf} psf</span>
        </div>`)
    const flatRoofLoadTextString = flatRoofLoadText.drawText();
    this.graphicTextArray.push(flatRoofLoadTextString);

    //Draw max surcharge text.
    const maxSurchargeText = new Text(
      this.gr,
      this.xMiddleUp,
      surchargeYLocation - this.textAdjustment,
      `<div style="color: #3c5c6c; width:${130}px; text-align: left">
          <span>p<sub>d, max</sub> = ${this.results.maxDriftLoad} psf</span>
        </div>`)
    const maxSurchargeTextString = maxSurchargeText.drawText();
    this.graphicTextArray.push(maxSurchargeTextString);
    
    //Draw min surcharge text.
    if (parseFloat(this.results.minDriftLoad) > 0){
      const minSurchargeText = new Text(
        this.gr,
        this.xMiddleUp + this.gr.xLength(surchargeGraphicWidth),
        flatYLocation - this.textAdjustment,
        `<div style="color: #3c5c6c; width:${130}px; text-align: left">
            <span>p<sub>d, min</sub> = ${this.results.minDriftLoad} psf</span>
          </div>`)
      const minSurchargeTextString = minSurchargeText.drawText();
      this.graphicTextArray.push(minSurchargeTextString);
    }

    //Draw surcharge width dimension text.
    const surchargeDimensionText = new Text(
      this.gr,
      this.gr.x(-this.buildingWidth/2 + this.lengthUpper + surchargeGraphicWidth/2) - 60 / 2,
      this.gr.y(surchargeWidthDimensionYlocation) - this.textAdjustment,
      `<div style="color: black; width:${60}px; text-align: center">
          <span>${Math.min(this.results.w, this.inputs.lengthLowerRoof)}'</span>
        </div>`)
    const surchargeDimensionTextString = surchargeDimensionText.drawText();
    this.graphicTextArray.push(surchargeDimensionTextString);
  }
}
