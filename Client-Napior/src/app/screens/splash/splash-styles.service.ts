import { Injectable } from '@angular/core';

@Injectable()
export class SplashStylesService {

  public mobile = window.innerWidth < 600 ? true : false;

  private betterCalcsFontSize = Math.max(Math.min(0.0443 * window.innerWidth, 72), 44);
  public betterCalcs= {
    'font-size': this.betterCalcsFontSize + 'px'
  };

  private calcsInCloudFontSize = Math.max(Math.min(0.0271 * window.innerWidth, 44), 26);
  public calcsInCloud= {
    'font-size': this.calcsInCloudFontSize + 'px'
  };

  private threeBenefitsFontSize = Math.max(Math.min(0.0441 * window.innerWidth, 20), 12);
  public threeBenefits= {
    'font-size': this.threeBenefitsFontSize + 'px'
  };

  private benefitsListPadding = window.innerWidth < 960 ? 0 : 15;
  public benefitsList = {
    'padding-left': this.benefitsListPadding
  };

  private betterCalcsContainerMarginTB = window.innerWidth < 960 ? 0 : 60;
  private leftMargin = 0.075 * window.innerWidth;
  private betterCalcsContainerMarginL = window.innerWidth < 960 ? 10 : this.leftMargin;
  public betterCalcsContainer = {
    'margin-top': this.betterCalcsContainerMarginTB + 'px',
    'margin-bottom': this.betterCalcsContainerMarginTB + 10 + 'px',
    'margin-left': this.betterCalcsContainerMarginL
  };
  
  private modulesTitleSize = window.innerWidth < 960 ? 36 : 45;
  public modulesTitle = {
    'font-size': this.modulesTitleSize + 'px',
  }
  
  private moduleIconSize = window.innerWidth < 960 ? 60 : 100;
  public moduleIcon = {
    'width': this.moduleIconSize + '%',
    'max-width': '300px'
  }
  
  private moduleHeadingSize = window.innerWidth < 960 ? 28 : 36;
  public moduleHeading = {
    'font-size': this.moduleHeadingSize + 'px'
  }

  constructor() { }

}
