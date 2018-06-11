import { Directive, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appMathLine]'
})
export class MathLineDirective {

  private maxHeight=0;
  private adjustSource = new Subject<string>();
  adjust$ = this.adjustSource.asObservable();

  constructor(private el: ElementRef) {}

  ngAfterViewChecked(){
    this.adjustSource.next('next')
  }
  
  ngOnInit(){
    this.adjust$.subscribe(next =>{
      this.adjustMargins();
    })
  }
  
  adjustMargins(){
    
    for (let i=0; i <this.el.nativeElement.children.length; i++){
      let heightI = this.el.nativeElement.children[i].clientHeight;
      this.maxHeight = (heightI > this.maxHeight) ? heightI: this.maxHeight;
    }
    for (let i=0; i < this.el.nativeElement.children.length; i++) {
      let heightN = this.el.nativeElement.children[i].clientHeight;
      let marginTop = (this.maxHeight - this.el.nativeElement.children[i].clientHeight)/2 + 'px';
      this.el.nativeElement.children[i].style.marginTop = marginTop;
    }
  }

}
