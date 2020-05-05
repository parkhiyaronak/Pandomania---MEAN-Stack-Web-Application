import { Component, OnInit } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { Params } from '@angular/router';
import { Countrylmaodata } from '../models/countrylmaodata.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  countriesDataC: Countrylmaodata[] = [];
  countriesDataCloned: Countrylmaodata[] = [];

  constructor(
    private service: CovidService
    ) { }

  ngOnInit(): void {

    this.service.getAllTheCountriesData().subscribe((data: any) => {
      if (data) {
        this.countriesDataC = data;
        this.countriesDataCloned = data;
      }
    });

  }



}
