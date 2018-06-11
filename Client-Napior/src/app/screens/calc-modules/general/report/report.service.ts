import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as html2canvas from 'html2canvas';

@Injectable()
export class ReportService {

  constructor( private cd: ChangeDetectorRef ) {}

  public reportPageList = [];
  public reportImageList = [];
  public report;
  public pageLength;
  public pageLength2;
  public pageWidth;
  public shadowReportStyle = {'display': 'block'};
  private reportSource = new Subject<string>();
  report$ = this.reportSource.asObservable();


  printReport(): void {
      console.log('Print Report');
      window.print();
  }

  generateReportList(): void {
      this.report = [];
      document.getElementsByClassName('report-page-wrapper')[0].setAttribute("style", "display:block");
      let pageContent = document.getElementsByClassName('report-page-content')[0].children[0];
      this.pageLength = document.getElementsByClassName('report-page-content')[0].clientHeight;
      this.pageWidth = (window.innerWidth-515)*0.6;
      this.pageLength2 = (1-0.04857)*(((this.pageWidth*11/8.5)-(0.05993*this.pageWidth))*0.94);
      let pageBottom =this.pageLength2;
      let contentLength: number = 0;
      let pageElementList = [];
      let pageElNum = 1;

      // Loop across report children to determine length of report content.
      for (let i = 0; i < pageContent.childElementCount; i++) { 
          var elHeight = pageContent.children[i].getBoundingClientRect().height; // Determine height of element
          const style = getComputedStyle(pageContent.children[i]);
          
          if (pageContent.children[i].hasAttribute('appMathLine') && !pageContent.children[i].hasAttribute('hidden')){//Adjust element size for page overflow.
            let fontSize = parseFloat(style.fontSize);
            elHeight = Math.max(elHeight, 2.8*fontSize);
          }

          elHeight += parseInt(style.marginTop) + parseInt(style.marginBottom); // Add margins to element height.
          contentLength = contentLength + elHeight;

          if(pageContent.children[i].className === 'report-graphic'){
            console.log('Graphic recognized');
            this.graphicToCanvas(pageContent.children[i], i);
          };

          if (contentLength < pageBottom) { // Add element to page list.
            pageElementList.push(pageContent.children[i]);
            //console.log(`El Ht ${pageElNum} = ${elHeight}`);
            //console.log(`Cont L ${pageElNum} = ${contentLength}`);
          } else { // If current element runs off current page, add page to report and start new page list.
            pageElNum = 1;
            this.reportPageList.push(pageElementList);
            //console.log(`End Page ${this.reportPageList.length}`);
            contentLength = pageBottom + elHeight;
            pageBottom = pageBottom + this.pageLength2;
            pageElementList = [];
            pageElementList.push(pageContent.children[i]);
            //console.log(`El Ht ${pageElNum} = ${elHeight}`);
            //console.log(`Cont L ${pageElNum} = ${contentLength}`);
          }
          pageElNum++;
          if (i == pageContent.childElementCount - 1) { // At the end of loop, add final page (which is currently being populated) to the report list.
              this.reportPageList.push(pageElementList);
          }
      }

      this.report = this.reportPageList;
      //this.reportSource.next(this.report);
      this.reportPageList = [];
      //document.getElementsByClassName('report-page-wrapper')[0].setAttribute("style", "display:none");
      //this.hideShadowReport();
      this.reportSource.next(this.report);
      console.log('Assembling Report')
  }
  
  thickenFracLines() {
    const fracs = document.getElementsByClassName("frac-line");
    for(let k=0; fracs.length > k;k++) {
      fracs[k].setAttribute("style", "border-bottom-width:0.12em");
    }	
  }
  controlSqrtLines() {
    const sqrts = document.getElementsByClassName("hide-tail");
    let sqrtWidthArr = [];
    for(let k=0; k < sqrts.length;k++) {
        const sqrtLine = sqrts[k].firstElementChild;
        sqrtLine.setAttribute("width", "4em");
        const parentWidth = sqrtLine.closest(".mord").getBoundingClientRect().width;
        let sqrtPx = parentWidth + "px";
        sqrtWidthArr.push(sqrtPx);
    }
    const halfLength = sqrtWidthArr.length/2;
    sqrtWidthArr.splice(0, halfLength);
    let sqrtWidthArr2 = [];
    for(let i=0; i<sqrtWidthArr.length; i++){
        sqrtWidthArr2.push(sqrtWidthArr[i])
    }
    for(let i=0; i<sqrtWidthArr2.length; i++){
        sqrtWidthArr.push(sqrtWidthArr2[i])
    }
    for(let k=0; k < sqrts.length;k++) {
        const sqrtLine = sqrts[k].firstElementChild;
        sqrtLine.setAttribute("width", "4em");
        const parentWidth = sqrtLine.closest(".mord").getBoundingClientRect().width;
        let sqrtPx = parentWidth + "px";
        sqrtLine.setAttribute("width", sqrtWidthArr[k]);
        sqrtLine.setAttribute("style", "overflow: hidden");
    }
    this.reportSource.next(this.report);
  }
  
  graphicToCanvas(element, index){
    let canvasSource =  new Subject<string>();
    let canvas$ = canvasSource.asObservable();
    let image: HTMLImageElement = element.getElementsByTagName('img').item(0); // Create image element to add base64 image to.

    setTimeout(()=>{
      let graphicElements:HTMLCollection = element.getElementsByTagName('svg'); // Get svg of graphic.
      let width =  element.getBoundingClientRect().width;
      let height = element.getBoundingClientRect().height;
      console.log(graphicElements);
      let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` + graphicElements.item(0).innerHTML + `</svg>`; // Get svg string.
      element.getElementsByTagName('svg').item(0).remove();// Remove svg from element to be added to report.
      let DOMURL = window.URL;
      let img = new Image();
      let svg = new Blob([svgString], {type: 'image/svg+xml'});
      let url = DOMURL.createObjectURL(svg);

      img.onload = ()=>{
        let canvas: HTMLCanvasElement = document.createElement('canvas'); // Create canvas element to right to.
        canvas.width = width;
        canvas.height = height;

        let ctx: CanvasRenderingContext2D = canvas.getContext('2d', {preserveDrawingBuffer: true});
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        canvasSource.next(canvas.toDataURL());
      }
      img.src = url;
    }, 20)

    canvas$.subscribe((uri)=>{
      image.src = uri;
    })
  }

  round(number, precision){
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
}
