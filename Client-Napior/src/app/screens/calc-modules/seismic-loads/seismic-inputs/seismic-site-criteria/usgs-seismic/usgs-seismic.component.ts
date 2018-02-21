import { Component, OnInit, Input } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { MapsService } from './maps-service.service';
import { UsgsData } from './usgs-data'
import * as xml2js from 'xml2js';

declare let google: any;

@Component({
  selector: 'app-usgs-seismic',
  templateUrl: './usgs-seismic.component.html',
  styleUrls: ['./usgs-seismic.component.css'],
  providers: [MapsService, GoogleMapsAPIWrapper]
})
export class UsgsSeismicComponent implements OnInit {
  
  @Input() inputs: any;

  public siteClasses: string[];
  public lat: number = 47.6062;
  public lng: number = -122.3421;
  public usgsData: UsgsData;
  public loadingUsgs: boolean;
  public rawUsgsData: {};
  map: any;


  constructor(private ms: MapsService, public gMaps: GoogleMapsAPIWrapper){
    this.siteClasses = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ];
  }
  
  //Function that uses service to get usgs data from usgs API.
  public changeAddress(usgsData, map) {
    usgsData['usgsIsLoading'] = true;
    this.rawUsgsData = {};
    this.ms.getGeocoding(this.inputs.siteAddress, this.inputs.riskCategory, this.inputs.siteClass).subscribe(function (x) {
      this.rawUsgsData = x;
      usgsData.latitude = this.rawUsgsData.latitude;
      usgsData.longitude = this.rawUsgsData.longitude;
      usgsData.Ss = this.rawUsgsData.Ss;
      usgsData.S1 = this.rawUsgsData.S1;
      usgsData.Fa = this.rawUsgsData.Fa;
      usgsData.Fv = this.rawUsgsData.Fv;
      usgsData.Sds = this.rawUsgsData.Sds;
      usgsData.Sd1 = this.rawUsgsData.Sd1;
      usgsData.usgsIsLoading = this.rawUsgsData.loadingUsgs;
      const position = new google.maps.LatLng(usgsData.latitude,usgsData.longitude);
    
      map.setCenter(position);
      map.setZoom(15);
      const marker = new google.maps.Marker({position: position});
      marker.setMap(map);
    });
  }
  
  //Loads API Wrapper from map child component.
  public loadAPIWrapper(map) {
    this.map = map;
    this.changeAddress(this.inputs, this.map);
  }

  ngOnInit() {

  }
}
