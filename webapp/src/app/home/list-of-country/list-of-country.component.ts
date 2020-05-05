import { Component, OnInit, Input } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import { HttpClient } from '@angular/common/http';
import { Countrylmaodata } from '../../models/countrylmaodata.model';


@Component({
  selector: 'app-list-of-country',
  templateUrl: './list-of-country.component.html',
  styleUrls: ['./list-of-country.component.scss']
})
export class ListOfCountryComponent implements OnInit {
  searchString: string;
  order: string = 'cases';
  reverse: boolean = true;
  @Input()  countriesData: Countrylmaodata[] = [];
  countriesDataCloned: Countrylmaodata[] = [];

  constructor() { }

  ngOnInit(): void {
    this.countriesDataCloned = this.countriesData;
  }


  /**
   * to set the order of table data
   */
  setOrder(value: string) { 
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
