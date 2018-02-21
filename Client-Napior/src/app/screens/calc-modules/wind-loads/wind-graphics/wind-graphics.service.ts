import { Injectable } from '@angular/core';
import { GraphicsService } from '../../general/graphics/graphics.service';
import { Story, Ground, StoryDimension, GraphicInput, Text, Arrow } from '../../general/graphics/svg-elements/svg-classes';

@Injectable()
export class WindGraphicsService {

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

  drawGraphic(options) {
    this.initGraphic();
    let direction = options.direction;
    let results = this.results[direction];
  //Draw inputs.
    let ground = new Ground(this.gr, this.buildingWidth) //Draw Ground.
    ground.drawGround();
    this.drawWindStories(); //Draw stories 
  //Draw results.
    if(this.calculationStatus.haveResults == true){
      if (options.forceType ==='forces'){
        this.drawStoryForces(results);
        this.drawBaseShear(results.baseShear);  
      } else {
        this.drawPressures(results);
      }
    }
  }

  drawWindStories(){
    //Draw elements for each story.
    for (let i = 0; i < this.inputs.storyHeights.length; i++) {

      //Draw story geometry.
      let story = new Story(this.gr, this.inputs.storyHeights[i], this.buildingWidth, this.inputs.storyCumulativeHeights[i]);
      story.drawStory();

      //Draw story dimension.
      let dimension = new StoryDimension(this.gr, this.inputs.storyHeights[i], this.buildingWidth + 4.5, this.inputs.storyCumulativeHeights[i]);
      dimension.drawDimension();
      let dimensionVertLoc = this.inputs.storyCumulativeHeights[i] - this.inputs.storyHeights[i] / 2 + 1;
      let dimensionPrefix = ``;
      let dimensionSuffix = ` ft`;
      let dimensionTextWidth = 10;
      let dimensionInputI = new GraphicInput(this.gr, this.buildingWidth / 2 + 11.5, dimensionVertLoc, dimensionTextWidth, dimensionPrefix, dimensionSuffix);
      this.heightInputArray.push(dimensionInputI);
      //Draw story force text.
      //Position for ui or report.
      let locationAdjustments = {
        'ui': {
          'storyTextX': this.gr.x(0)- 150/2,
          'storyTextY': this.gr.y(this.inputs.storyCumulativeHeights[i]) + 1,
          'textWidth': 150
        },
        'report': {
          'storyTextX': this.gr.x(0)-((window.innerWidth - 500)*0.07)/2,
          'storyTextY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
          'textWidth': (window.innerWidth - 500)*0.07
        }
      }
      let storyForceTextI = new Text(
        this.gr,
        locationAdjustments[this.type]['storyTextX'],
        locationAdjustments[this.type]['storyTextY'],
        `<div style="color: #000000; width:${locationAdjustments[this.type]['textWidth']}px; text-align: center">
            <span>Story: ${this.inputs.storyNames[i]}</span>
          </div>`)
      let storyForceTextIString = storyForceTextI.drawText();
      this.graphicTextArray.push(storyForceTextIString);

    };
  }

  drawBaseShear(baseShear){
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
          <span>V = ${baseShear} kips</span>
        </div>`);
    let baseShearTextString = baseShearText.drawText();
    this.graphicTextArray.push(baseShearTextString);
  }

  drawStoryForces(results){
    let maxForce = Math.max(...results.storyForces);
    let arrowNumber = Math.min(results.storyForces.length, this.inputs.storyHeights.length)
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
        this.gr.xLength(Math.max(12*results.storyForces[i]/maxForce, 0.3)),
        Math.max(0.0014 * this.gr.height*results.storyForces[i]/maxForce, 0.0007* this.gr.height),
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
            <span>F<sub>${this.inputs.storyNames[i]}</sub> = ${results.storyForces[i]} kips</span>
          </div>`)
      let storyForceTextIString = storyForceTextI.drawText();
      this.graphicTextArray.push(storyForceTextIString);
    }
  }

  drawPressures(results){
    let maxForce = Math.max(...results.windwardWallPressure);
    let arrowNumber = Math.min(results.windwardWallPressure.length, this.inputs.storyHeights.length);
    let initialLinePosition = {
      'ui': {
        'initialX': this.gr.x(-15) - 150,
        'initialY': this.gr.y(0),
      },
      'report': {
        'initialX': this.gr.x(-40),
        'initialY': this.gr.y(0),
      }
    }
    //let windwardPressureLine = [[initialLinePosition[this.type]['initialX'], initialLinePosition[this.type]['initialY']]];
    let zeroPressurePoint = [initialLinePosition[this.type]['initialX'], initialLinePosition[this.type]['initialY']];
    let windwardPressureLine = [];
    let windwardPressurePolygon = [zeroPressurePoint];
    let leewardPressureLine = [];
    let leewardPressurePolygon = [];
    for (let i = 0; i < arrowNumber; i++) {
      //Position for ui or report.
      let locationAdjustments = {
        'ui': {
          'winwardArrowX': this.gr.x(-15) - 150,
          'winwardArrowY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
          'winwardArrowTextX': this.gr.x(-15) - 150,
          'winwardArrowTextY': this.gr.y(this.inputs.storyCumulativeHeights[i]) -12,
          'windwardTextWidth': 150,
          'leewardArrowX': this.gr.x(23),
          'leewardArrowY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
          'leewardArrowTextX': this.gr.x(13.5),
          'leewardArrowTextY': this.gr.y(this.inputs.storyCumulativeHeights[i]) - 30,
          'leewardArrowTextWidth': 150
        },
        'report': {
          'winwardArrowX': this.gr.x(-40),
          'winwardArrowY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
          'winwardArrowTextX': this.gr.x(-38),
          'winwardArrowTextY': this.gr.y(this.inputs.storyCumulativeHeights[i])-5,
          'windwardTextWidth': (window.innerWidth - 500)*0.07,
          'leewardArrowX': this.gr.x(40),
          'leewardArrowY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
          'leewardArrowTextX':  this.gr.x(32),
          'leewardArrowTextY': this.gr.y(this.inputs.storyCumulativeHeights[i]),
          'leewardArrowTextWidth': 150
        }
      }
      //Draw windward pressure arrow.
      let winwardArrowX = locationAdjustments[this.type]['winwardArrowX'];
      let winwardArrowY = locationAdjustments[this.type]['winwardArrowY'];
      let winwardArrowLength = this.gr.xLength(Math.max(9*results.windwardWallPressure[i]/maxForce, 0.3));
      if (i == 0){
        let initialPressurePoint = [winwardArrowX - 0.5*winwardArrowLength, this.gr.y(0)];
        windwardPressureLine.push(initialPressurePoint);
        windwardPressurePolygon.push(initialPressurePoint);
      } 

      let windwardPressureArrowI = new Arrow(
        this.gr,
        winwardArrowX,
        winwardArrowY,
        winwardArrowLength,
        Math.max(0.0014 * this.gr.height*results.windwardWallPressure[i]/maxForce, 0.0007* this.gr.height),
        2,
        180,
        '#3c5c6c');
      windwardPressureArrowI.drawArrow();
      
      //Draw windward pressure text.
      let windwardPressureTextI = new Text(
        this.gr,
        locationAdjustments[this.type]['winwardArrowTextX'],
        locationAdjustments[this.type]['winwardArrowTextY'],
        `<div style="color: #3c5c6c; width:${locationAdjustments[this.type]['windwardTextWidth']}px; text-align: center">
            <span>p<sub>${this.inputs.storyNames[i]}</sub> = ${results.windwardWallPressure[i]} psf</span>
          </div>`)
      let windwardPressureTextIString = windwardPressureTextI.drawText();
      this.graphicTextArray.push(windwardPressureTextIString);

      windwardPressureLine.push([winwardArrowX - winwardArrowLength, winwardArrowY]);
      windwardPressurePolygon.push([winwardArrowX - winwardArrowLength, winwardArrowY]);
      if(i == arrowNumber-1) {
        windwardPressurePolygon.push([winwardArrowX, winwardArrowY]);
        windwardPressurePolygon.push([winwardArrowX, this.gr.y(0)]);
      }

      // Draw leeward pressure arrow.
      let leewardArrowX = locationAdjustments[this.type]['leewardArrowX'];
      let leewardArrowY = locationAdjustments[this.type]['leewardArrowY'];
      let leewardArrowLength = this.gr.xLength(Math.max(9*-1*results.leewardWallPressure/maxForce, 0.3));

      let leewardPressureArrowI = new Arrow(
        this.gr,
        leewardArrowX,
        leewardArrowY,
        leewardArrowLength,
        Math.max(0.0014 * this.gr.height*-1*results.leewardWallPressure/maxForce, 0.0007* this.gr.height),
        2,
        180,
        '#36AE74');
      leewardPressureArrowI.drawArrow();

      if(i == arrowNumber-1) {
        this.gr.scene.rect(leewardArrowLength, this.gr.y(0) - this.gr.y(this.inputs.storyCumulativeHeights[i]))
          .fill({color: '#36AE74'})
          .attr({'fill-opacity': 0.15})
          .move(leewardArrowX-leewardArrowLength, leewardArrowY);
        
        this.gr.scene.line(leewardArrowX, this.gr.y(0), leewardArrowX, this.gr.y(this.inputs.storyCumulativeHeights[i]))
          .stroke({color: '#36AE74', width: 2}).fill('none');

        let leewardPressureTextI = new Text(
          this.gr,
          locationAdjustments[this.type]['leewardArrowTextX'],
          locationAdjustments[this.type]['leewardArrowTextY'],
          `<div style="color: #36AE74; width:${locationAdjustments[this.type]['leewardArrowTextWidth']}px; text-align: center">
              <span>p<sub>h</sub> = ${results.leewardWallPressure} psf</span>
            </div>`)
        let leewardPressureTextIString = leewardPressureTextI.drawText();
        this.graphicTextArray.push(leewardPressureTextIString);
      }
    }

    // Draw Line surrounding pressure.
    this.gr.scene.polyline(windwardPressureLine)
      .stroke({color: '#3c5c6c', width: 2}).fill('none');

    // Draw pressure polygon.
    let windwardPressurePolygonArray=[];
    windwardPressurePolygon.forEach((coords)=>{
      windwardPressurePolygonArray.push(coords[0]);
      windwardPressurePolygonArray.push(coords[1]);
    });

    this.gr.scene.polyline(windwardPressurePolygonArray)
      .stroke({color: '#3c5c6c', width: 0}).fill({color: '#3c5c6c'}).attr({'fill-opacity': 0.1});
  }

}
