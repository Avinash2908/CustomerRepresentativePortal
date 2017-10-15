import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ServicFactoryService {

  locations: String[] = ["Hyderabad", "Chennai", "Bangalore"];

  representativeDetails = [{
    name: "Avinash",
    location: "Chennai",
    activities: ["Play Cricket", "Coding"]
  }];

  constructor(private http: Http) { }

  getLocations = () => {
    return this.locations;
  }

  getRepresentativeDetails = () => {
    console.log('Inside get Rep details');
    return this.http.get('assets/representativeDetails.json').map((data) => data.json());
  }
}
