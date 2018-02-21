import { Injectable,  NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as xml2js from 'xml2js';

declare const google: any;

@Injectable()
export class MapsService {
  constructor(private __loader: MapsAPILoader, private http: Http, private _zone: NgZone ) {

  }

  private rawUsgsData: string;
  private usgsData: {};

  getGeocoding(address: string, riskCategory: string, siteClass: string) {
    return Observable.create(observer => {
      this.__loader.load().then(() => {
        //Get coordinates of site from Google maps.
        let geocoder = new google.maps.Geocoder(); //Create instance of google maps geocoder.
        geocoder.geocode({address}, (results)=>{
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          const coords = [lat, lng];
        //Get usgs parameters based on coordinates.
          let siteClassIndex = {
    				'A': 0,
    				'B': 1,
    				'C': 2,
    				'D': 3,
    				'F': 5
			    };
    			let riskCategoryIndex = {
    				'I': 0,
    				'II': 1,
    				'III': 2,
    				'IV': 3
    			};
          let foo = `https://cors-anywhere.herokuapp.com/https://earthquake.usgs.gov/designmaps/us/inc/data-api.inc.php?latitude=${lat}&longitude=${lng}&edition=ibc-2012&variant=0&siteclass=${siteClassIndex[siteClass]}&riskcategory=${riskCategoryIndex[riskCategory]}`;
          let usgsPostData = {
            'latitude': lat,
            'longitude': lng,
            'siteClass': siteClassIndex[siteClass],
            'riskCategory': riskCategoryIndex[riskCategory]
          }
          let usgsUrl = '/usgs_api';
          const headers = new Headers({ 'Content-Type': 'application/json' });
          const options = new RequestOptions({ headers: headers });
          this.http.post(usgsUrl, usgsPostData, options)
          .subscribe(
            data => {
              let responseData:any =data;
              let rawUsgsData = JSON.parse(responseData._body);
              rawUsgsData['loadingUsgs'] = false;
              observer.next(rawUsgsData);
          })
        });
      });
    });
  }
}
