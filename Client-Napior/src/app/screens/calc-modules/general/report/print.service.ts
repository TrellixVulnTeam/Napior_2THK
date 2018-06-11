import { Injectable, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subject , Observable} from 'rxjs';

import * as domToImage from 'dom-to-image';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Injectable()
export class PrintService {
  
  public pageCanvases = [];
  public string = "test";
  public pageCount = 1;
  public rendering: boolean;
  
  constructor(public ngZone: NgZone, public cd:ChangeDetectorRef ) {
    this.rendering = true;
  }

  printReport(): void {
    let reportPages = document.getElementsByClassName('report-page-wrapper');
    this.rendering = true;
    let opt = <any> { //Configure canvas options for html2canvas.
      scale: 2.5,
      letterRendering: true,
      async: true,
      imageTimeout: 0,
      logging: false,
    };

    let doc = new jsPDF({ //Configure pdf options for jsPDF.
      orientation: 'portrait',
      unit: 'in',
      format: [8.5, 11]
    });

    this.pageCount = 1;
    let reportPageNumber = reportPages.length -1;

    let report$ = new Observable((observer)=>{ //Observable emits rendered canvases for each report page.
      for (let i=1; i<reportPages.length; i++){
        let reportPage = <HTMLElement>reportPages[i];
        let canvas = html2canvas(reportPage, opt).then((canvas)=>{
            observer.next(canvas);
        });
        
      }
    })

    report$.subscribe((img: HTMLCanvasElement)=>{ //Add page to report for each canvas emitted by observable.
      console.log(this.pageCount);
      img.toDataURL("image/png");
      if (this.pageCount === 1){
        doc.addImage(img, 'JPEG', 0, 0, 8.5, 11);
        if (reportPageNumber === 1){
          doc.save('report.pdf')
        }
      } else if (this.pageCount < reportPageNumber){
        doc.addPage();
        doc.addImage(img, 'JPEG', 0, 0, 8.5, 11);
      } else {
        doc.addPage();
        doc.addImage(img, 'JPEG', 0, 0, 8.5, 11);
        doc.save('report.pdf');
        this.rendering = false
      }
      this.pageCount += 1;
    });
  }

}
