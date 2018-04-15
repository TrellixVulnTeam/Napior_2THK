import { Injectable } from '@angular/core';
import { RunCalcService } from '../../general/run-calc/run-calc.service';
import { BeamSpan } from './beam-spans/beam-span';
import { InputChangeService } from '../../general/inputs/input-change.service';

@Injectable()
export class CommonBeamService {

  public supportTypes = [
    'Pinned',
    'Roller',
    'Fixed',
    'Free'
  ]

  constructor(public calc: RunCalcService, public inputs:InputChangeService) { }

  addSpanRight(){
    this.calc.inputs.nodes.push('Pinned');
    const newSpanSection = this.calc.inputs.sections[0].section;
    const newSpan = new BeamSpan(10, newSpanSection, this.calc.inputs.nodes.length-2, this.calc.inputs.nodes.length-1);
    this.calc.inputs.spans.push(newSpan);
    this.inputs.redrawGraphic();
  }

  addSpanLeft(){
    this.calc.inputs.nodes.unshift('Pinned');
    const newSpanSection = this.calc.inputs.sections[0].section;
    const newSpan = new BeamSpan(10, newSpanSection, this.calc.inputs.nodes.length-2, this.calc.inputs.nodes.length-1);
    this.calc.inputs.spans.unshift(newSpan);
    this.sequenceSupports();
    this.inputs.redrawGraphic();
  }

  deleteSpan(i){
    this.calc.inputs.spans.splice(i, 1);
    this.calc.inputs.nodes.splice(i, 1)
    this.sequenceSupports();
    this.inputs.redrawGraphic();
  }

  sequenceSupports(){
    for (let i=0; i<this.calc.inputs.spans.length; i++){
      this.calc.inputs.spans[i].startNode = i;
      this.calc.inputs.spans[i].endNode = i+1;
    } 
  }

}
