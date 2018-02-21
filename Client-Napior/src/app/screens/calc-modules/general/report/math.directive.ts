import { Directive, ElementRef, Input } from '@angular/core';
import * as katex from 'katex';
//import * as mathjax from 'mathjax';

@Directive({
  selector: '[Math]'
})
export class MathDirective {

  @Input('Math') mathString: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.mathString = '\\displaystyle \\sf ' + this.mathString;
    this.el.nativeElement.innerHTML = this.mathString;
    katex.render(this.mathString, this.el.nativeElement);
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
  }
}
