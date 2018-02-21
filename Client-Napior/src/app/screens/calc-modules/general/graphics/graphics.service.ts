import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as SVG from 'svg.js';
import * as canvg from 'canvg-browser';

@Injectable()
export class GraphicsService {

  public scene: SVG.Doc;
  public width: number;
  public height: number;
  public verticalCameraShift: number = 0;
  public horizontalCameraShift: number = 0;
  public verticalScale: number = 1;
  public horizontalScale: number = 1;
  public sceneSizeFactor: number = 1;
  public reportGraphic: any;
  public svgElement: HTMLElement;
  public typeTimeout = {
    'ui': 0,
    'report': 10,
  }

  constructor() { }

  drawScene() {
    this.generateScene();
  }

  generateScene() {
    let sceneElement = this.svgElement;
    if (sceneElement.children.length < 1){
      this.scene = SVG(this.svgElement).size('100%', '100%');
    } else {
      this.clearScene(sceneElement);
      this.scene = SVG(this.svgElement).size('100%', '100%');
    }

  }

  //Scale based on content.
  x(xLoc: number): number {
    let xCoord = this.horizontalScale * (xLoc - this.horizontalCameraShift) + this.width / 2;
    return xCoord
  }

  y(yLoc: number): number {
    let yCoord = this.verticalScale * (-1 * yLoc + this.verticalCameraShift) + this.height / 2;
    return yCoord
  }

  xLength(xLoc: number): number {
    let xCoord = this.horizontalScale * (xLoc);
    return xCoord
  }

  yLength(yLoc: number): number {
    let yCoord = this.verticalScale * (yLoc);
    return yCoord
  }

  //Constant regardless of parent element size or content
  xC(xLoc: number): number {
    let xCoord = (xLoc - this.horizontalCameraShift) + this.width / 2;
    return xCoord
  }

  yC(yLoc: number): number {
    let yCoord = (-1 * yLoc + this.verticalCameraShift) + this.height / 2;
    return yCoord
  }

  clearScene(element) {
    let sceneElement = element;
    let sceneElementLength = sceneElement.children.length;
    sceneElement.children[sceneElementLength - 1].remove()
  }

  parseInputArray(array) {
    for (let i = 0; i < array.length; i++) {
      let parsedElement = parseFloat(array[i]);
      array[i] = parsedElement;
    }
    return array;
  }

}
