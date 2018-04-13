import { Component, OnInit } from '@angular/core';
import { RunCalcService } from '../../../general/run-calc/run-calc.service';
import { CommonBeamService} from '../common-beam.service';

@Component({
  selector: 'app-beam-spans',
  templateUrl: './beam-spans.component.html',
  styleUrls: ['./beam-spans.component.css']
})
export class BeamSpansComponent implements OnInit {

  constructor(public calc: RunCalcService, public beam: CommonBeamService) { }

  ngOnInit() {
  }

}
