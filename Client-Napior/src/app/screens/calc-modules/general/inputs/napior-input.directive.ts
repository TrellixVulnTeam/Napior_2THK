import { Directive, HostListener, HostBinding, Input, ElementRef } from '@angular/core';
import { InputChangeService } from './input-change.service';
import { RunCalcService } from '../run-calc/run-calc.service';
import { ClickOutsideModule } from 'ng-click-outside';

@Directive({
  selector: '[napiorInput]'
})
export class NapiorInputDirective {

  @Input() updateGraphic = false;
  @Input() runCalculation = false;
  private isActive = false;

  // Host listener to update graphic instantly, (i.e. with selects, toggles, etc.)
  @HostListener('ngModelChange', ['$event'])
  onChange(event){
    if (this.updateGraphic === true && this.el.nativeElement.localName != 'input') {
      setTimeout(()=>{
        this.calc.calculationStatus.haveResults = false;
        this.calc.calculationStatus.noResults = true;
        this.inputs.inputChangeSource.next('graphic');
      }, 10);
    }
  }

  // To avoid a redraw on each input keystroke the following host listeners are used.
  @HostListener('input', ['$event'])
  clickedElement(event){
    setTimeout(()=>{this.isActive = true;}, 20)
  }

  // Host listener to update graphic on enter (for inputs).
  @HostListener('keyup.enter', ['$event'])
  onEnter(event){
    if (this.updateGraphic === true && this.el.nativeElement.localName === 'input') {
      this.isActive = false;
      setTimeout(()=>{
        this.calc.calculationStatus.haveResults = false;
        this.calc.calculationStatus.noResults = true;
        this.inputs.inputChangeSource.next('graphic');
      }, 10);
    }
  }

  // Host listener to update graphic when clicked outside (for inputs).
  @HostListener('document:click', ['$event'])
  onClickOutside(event){
    if (this.updateGraphic === true && this.el.nativeElement.localName === 'input' && this.isActive === true) {
      this.isActive = false;
      setTimeout(()=>{
        this.calc.calculationStatus.haveResults = false;
        this.calc.calculationStatus.noResults = true;
        this.inputs.inputChangeSource.next('graphic');
        console.log('Click Outside');
      }, 10);
    }
  }

  constructor(public inputs: InputChangeService, public calc: RunCalcService, public el: ElementRef) {
  }

  ngOnInit(){
  }

}
