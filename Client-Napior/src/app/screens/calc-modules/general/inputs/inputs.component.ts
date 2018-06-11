import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Tab } from '../input-tabs/tab';
import { SaveLoadService } from '../save-load/save-load.service';
import { RunCalcService } from '../run-calc/run-calc.service';
import { GenericDialogService } from '../generic-dialog/generic-dialog.service';
import { InputTabsService } from '../input-tabs/input-tabs.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
  host: {
    "[attr.fxFlex]": "500",
    "[attr.fxLayout]": "row",
    "id": "inputs",
  },
  providers: [SaveLoadService]
})
export class InputsComponent implements OnInit {

  @Output() loadedCalculationFile = new EventEmitter<any>();
  @Input() moduleType: string;

  //public inputs = this.calc.inputs;
  public loadCalcElem: HTMLElement;

  //Clicking the load button, triggers click on invisible file input.
  triggerLoadCalc(): void {
    this.loadCalcElem = document.getElementById('loadCalculationInputButton');
    this.loadCalcElem.click();
  }

  //Async function with observable to load calculation file.
  loadCalc(event: any): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    let readerObservable = Observable.create((observer)=>{
      reader.onload = function (event) {
        var target: any = event.target;
        var inputJson = JSON.parse(target.result);
        observer.next(inputJson);
        observer.complete();
      };
    })
    
    //Subscribe to file load observable and emit load event.
    const inputsCheck = readerObservable.subscribe({
      next: inputJson => {
        //this.loadedCalculationFile.emit(inputJson);
        this.loadInputs(inputJson)
      },
      error: error => console.log(error),
      complete: () => console.log('done')
    });
  }

  // Update the applicaton state with the loaded file.
  loadInputs(loadedInputs: any): void {
    if (loadedInputs['type'] == this.moduleType) {
      this.calc.calculationStatus.haveResults = false;
      this.calc.calculationStatus.isRunning = false;
      this.calc.calculationStatus.noResults = true;
      this.calc.inputs = loadedInputs;
    } else {
      let dialogContent = `It looks like this is a ${
        loadedInputs['typeName']
      } file. Please open a ${this.calc.inputs['typeName']} file.`;
      let dialogData = {
        width: '500px',
        height: '230px',
        title: 'Incorrect File Type',
        content: dialogContent
      };
      this.genericDialogService.openDialog(dialogData);
    }
  }

  constructor(
    public saveLoad: SaveLoadService, 
    public calc: RunCalcService, 
    public genericDialogService: GenericDialogService, 
    public inputTabs: InputTabsService, 
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }
}

