import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { RtdbService } from '../,,/../../../../common/rtdb.service';
import { GenericDialogService } from '../generic-dialog/generic-dialog.service';

@Injectable()
export class RunCalcService {

  public results: any;
  public inputs: any;
  public calculationStatus = {
    isRunning: false,
    noResults: true,
    haveResults: false,
  }
  private ranCalcSource = new Subject<string>();
  ranCalc$ = this.ranCalcSource.asObservable();
  

  constructor(private http: HttpClient, public rtdb: RtdbService, public genericDialogService: GenericDialogService,) { }

  runCalculation(post: string): void {
    this.calculationStatus.noResults = false;
    this.calculationStatus.isRunning = true;
    console.log(this.inputs);
    console.log('Calculating Results...');
    const apiUrl = '/napior_api';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    this.http.post(apiUrl, this.inputs, options)
      .subscribe(
        data => {
         this.results = JSON.parse(data['_body']);
         this.calculationStatus.isRunning = false;
         this.calculationStatus.haveResults = true;
         console.log(this.results);
         this.ranCalcSource.next('ran');
        }
      )
  }

  getUserData(){
    this.rtdb.getCoAndUserData()
    this.rtdb.userData$.subscribe( data => {
      this.inputs.engineer = this.rtdb.userData.name;
      this.inputs.company = this.rtdb.companyData.name;
    })
  }

  loadInputs(loadedInputs: any): void {
    console.log(loadedInputs);
    if (loadedInputs['type'] == 'seismicLoads') {
      this.inputs = loadedInputs;
    } else {
      let dialogContent = `It looks like this is a ${
        loadedInputs['typeName']
      } file. Please open a ${this.inputs['typeName']} file.`;
      let dialogData = {
        width: '500px',
        height: '230px',
        title: 'Incorrect File Type',
        content: dialogContent
      };
      this.genericDialogService.openDialog(dialogData);
    }
  }

}
