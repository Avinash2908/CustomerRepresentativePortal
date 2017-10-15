import { Component } from '@angular/core';
import { ServicFactoryService } from '../service/servic-factory.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore/underscore.js';

@Component({
  selector: 'app-customer-representative-portal',
  templateUrl: './customer-representative-portal.component.html'
})
export class CustomerRepresentativePortalComponent  {
  
    /** Object which contains name, locations from the input filters selected. 
     * location is an object with keys being location name and value boolean based on check box selection 
     */
    filters: { name: string; locations: any; } = {
      name: "",
      locations: {}
    };
  
    locations: any[]; //List of locations available in application
    representativeDetails: any[]; //Representative Data set
    filteredData: any[]; // Filtered Representative Data set
  
    /**
     * Get Location details from the service.
     * Representative details from service. And make sure you assign filteredData same as representstiveDetails initially.
     * Need to process/group the data and then sort it.
     */
    constructor(private servicFactory: ServicFactoryService) {
      this.locations = this.servicFactory.getLocations();
      this.servicFactory.getRepresentativeDetails().subscribe((response) => {
        this.representativeDetails = response;
        this.reset();
      });
    }
  
    /**
     * Reset filters and reset filtered data as representative details.
     */
    reset = () => {
      this.filters = {
        name: "",
        locations: {}
      }
      this.filteredData = this.representativeDetails;
      this.filterData();
    };
  
    /**
     * Filter the data based on name and location.
     * Later process/group the data and sort it.
     */
    filterData = () => {
      this.filteredData = this.representativeDetails;
      if (this.filters.name) {
        //console.log('name : ', this.filters.name);
        this.filteredData = _.where(this.filteredData, { name: this.filters.name });
      }
  
      /**
       * Gets the location array selected i.e. keys of filters.location for which value is true.
       */
      let filteredLocations = _.keys(_.pick(this.filters.locations, function (value, key, object) {
        return value;
      }));
  
      if (filteredLocations && filteredLocations.length) {
        this.filteredData = _.filter(this.filteredData, (each) => {
          return filteredLocations.includes(each.location);
        });
      }
  
      this.processFilteredData();
      this.sortDataByActivities();
    }
  
    /**
     * Process the filtered data and groups activities(unique activities) with same name and location
     */
    processFilteredData = () => {
      /**
       * Groups data i.e converts into object with key being "name-location" and value being array of matching results
       */
      let groupedData = _.groupBy(this.filteredData, (each) => {
        return each.name + "-" + each.location;
      })
      this.filteredData = [];
  
      /**
       * loop through values of above object. From each value(which is array), take the union of activities, name/location from 1st object and push into filteredData.
       */
      _.each(_.values(groupedData), (each) => {
        if (each && each.length) {
          this.filteredData.push({
            name: each[0].name,
            location: each[0].location,
            activities: _.union(..._.pluck(each, "activities"))
          })
        }
      })
  
    }
  
    /**
     * Sort the data in descending order of number of activities.
     */
    sortDataByActivities = () => {
      this.filteredData = _.sortBy(this.filteredData, (each) => {
        return -each.activities.length;
      })
    }
  
  }
