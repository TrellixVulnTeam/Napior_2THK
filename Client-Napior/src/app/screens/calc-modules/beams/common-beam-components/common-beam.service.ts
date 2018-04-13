import { Injectable } from '@angular/core';
import { RunCalcService } from '../../general/run-calc/run-calc.service';
import { BeamSpan } from './beam-spans/beam-span';

@Injectable()
export class CommonBeamService {

  constructor(public calc: RunCalcService) { }

  addSpanRight(){
    this.calc.inputs.nodes.push('Pinned');
    const newSpanSection = this.calc.inputs.sections[0].section;
    const newSpan = new BeamSpan(10, newSpanSection, this.calc.inputs.nodes.length-2, this.calc.inputs.nodes.length-1);
    this.calc.inputs.spans.push(newSpan);
  }

  addSpanLeft(){

  }

  deleteSpan(i){

  }

}
