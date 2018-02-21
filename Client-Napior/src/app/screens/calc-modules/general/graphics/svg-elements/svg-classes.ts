import { GraphicsService } from '../graphics.service';

export class Story {

    drawStory() {
      this.gr.scene.polyline([this.gr.x(-this.width / 2), this.gr.y(0), this.gr.x(-this.width / 2), this.gr.y(this.height), this.gr.x(this.width / 2), this.gr.y(this.height), this.gr.x(this.width / 2), this.gr.y(0)])
        .move(this.gr.x(-this.width / 2), this.gr.y(this.cumulativeHeight))
        .stroke({ color: 'black', width: 2 }).fill('none');
    }
  
    constructor(private gr: GraphicsService, public height: number, public width: number, public cumulativeHeight: number) { }
}

export class Ground {

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

export class StoryDimension {

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

export class HorizDimension {

    drawDimension() {
      const dimensionObjectArray = [];
      //Draw main dimension line.
      const dimLine = this.gr.scene.line(this.gr.x(0), this.gr.y(0), this.gr.x(this.length), this.gr.y(0))
        .move(this.gr.x(this.xLocation), this.gr.y(this.yLocation))
        .stroke({ color: 'black', width: 1 }).fill('none');
      //Draw left dash.
      const leftDash = this.gr.scene.line(this.gr.xC(0), this.gr.yC(-6), this.gr.xC(0), this.gr.yC(6))
        .cx(this.gr.x(this.xLocation)).cy(this.gr.y(this.yLocation))
        .stroke({ color: 'black', width: 1 }).fill('none');
      //Draw left tick.
      const leftTick = this.gr.scene.line(this.gr.xC(-3), this.gr.yC(-6), this.gr.xC(3), this.gr.yC(6))
        .cx(this.gr.x(this.xLocation)).cy(this.gr.y(this.yLocation))
        .stroke({ color: 'black', width: 1 }).fill('none');
      //Draw right dash.
      const rightDash = this.gr.scene.line(this.gr.xC(0), this.gr.yC(-6), this.gr.xC(0), this.gr.yC(6))
        .cx(this.gr.x(this.xLocation + this.length)).cy(this.gr.y(this.yLocation))
        .stroke({ color: 'black', width: 1 }).fill('none');
      //Draw right tick.
      const rightTick = this.gr.scene.line(this.gr.xC(-3), this.gr.yC(-6), this.gr.xC(3), this.gr.yC(6))
        .cx(this.gr.x(this.xLocation + this.length)).cy(this.gr.y(this.yLocation))
        .stroke({ color: 'black', width: 1 }).fill('none');
    }

    constructor(private gr: GraphicsService, public length: number, public xLocation: number, public yLocation){}
}

export class VertDimension {

  drawDimension() {
    const dimensionObjectArray = [];
    //Draw main dimension line.
    const dimLine = this.gr.scene.line(this.gr.x(0), this.gr.y(0), this.gr.x(0), this.gr.y(this.length))
      .move(this.gr.x(this.xLocation), this.gr.y(this.yLocation))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw left dash.
    const leftDash = this.gr.scene.line(this.gr.xC(-6), this.gr.yC(0), this.gr.xC(6), this.gr.yC(0))
      .cx(this.gr.x(this.xLocation)).cy(this.gr.y(this.yLocation))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw left tick.
    const leftTick = this.gr.scene.line(this.gr.xC(-6), this.gr.yC(-3), this.gr.xC(6), this.gr.yC(3))
      .cx(this.gr.x(this.xLocation)).cy(this.gr.y(this.yLocation))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw right dash.
    const rightDash = this.gr.scene.line(this.gr.xC(-6), this.gr.yC(0), this.gr.xC(6), this.gr.yC(0))
      .cx(this.gr.x(this.xLocation)).cy(this.gr.y(this.yLocation - this.length))
      .stroke({ color: 'black', width: 1 }).fill('none');
    //Draw right tick.
    const rightTick = this.gr.scene.line(this.gr.xC(-6), this.gr.yC(-3), this.gr.xC(6), this.gr.yC(3))
      .cx(this.gr.x(this.xLocation)).cy(this.gr.y(this.yLocation - this.length))
      .stroke({ color: 'black', width: 1 }).fill('none');
  }

  constructor(private gr: GraphicsService, public length: number, public xLocation: number, public yLocation){}
}
  
export class Text {
  
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
  
export class GraphicInput {
  
    public style: {};
    public left: number;
    public top: number;
  
    constructor(private gr: GraphicsService, public x: number, public y: number, public width: number, public prefix: string, public suffix: string, public graphicType?: string, public justifyVertical?: string, public justifyHorizontal?: string) {

      const verticalAdjust = (this.graphicType === 'ui') ? 19 : (window.innerWidth - 500)*0.008 + 2;

      if (this.justifyVertical === 'bottom') {
        this.top = this.gr.y(this.y) - verticalAdjust;
      } else if (this.justifyVertical === 'center') {
        this.top = this.gr.y(this.y) - verticalAdjust/2;
      } else {
        this.top = this.gr.y(this.y);
      }

      if (this.justifyHorizontal === 'right') {
        this.left = this.gr.x(this.x) - this.width;
      } else if (this.justifyHorizontal === 'center') {
        this.left = this.gr.x(this.x) - this.width/2;
      } else {
        this.left = this.gr.x(this.x);
      }
      
      this.style = {
        position: 'absolute',
        left: `${this.left}px`,
        top: `${this.top}px`,
        width: `${this.width}px`,
      }
    }
  
}

export class Arrow {

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