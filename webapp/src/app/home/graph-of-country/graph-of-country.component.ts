// @ts-ignore
import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CovidService} from '../../services/covid.service';
import {Countrylmaodata} from '../../models/countrylmaodata.model';
import {Covid} from '../../models/covid';
import {debugOutputAstAsTypeScript} from "@angular/compiler";
import {dateFormat} from "highcharts/highcharts.src";

// @ts-ignore
@Component({
  selector: 'app-graph-of-country',
  templateUrl: './graph-of-country.component.html',
  styleUrls: ['./graph-of-country.component.scss']
})
export class GraphOfCountryComponent implements OnInit {

  // @ts-ignore
  public countryData: Countrylmaodata[] = [];
  order: string = 'cases';
  reverse: boolean = true;
  public recoveryData: any = [];
  public confirmedData: any = [];
  public deathData: any = [];
  public date: any = [];
  updateFlag: boolean = false;

  constructor(public corvid: CovidService) {

  }

  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Daily Covid Information'
    },
    subtitle: {
      text: 'You can see recovery,death and total'
    },
    xAxis: {
      tickInterval: 7,
      gridLineWidth: 1,
      type: 'datetime',
      categories: this.date,
      labels: {
        formatter() {
          const dateArray = this.value.split('-');
          const months = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
          };
          const month = dateArray[1];
          const date = dateArray[2];
          return months[month] + " " + parseInt(date);
        }
      }
    },
    yAxis: {
      title: {
        text: 'Recovery,Death and total Count'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: false
        },
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true,

    },
    series: [{
      name: 'Recovery',
      marker: {
        symbol: 'square'
      },
      data: this.recoveryData
    },
      {
        name: 'Death',
        data: this.deathData
      },
      {
        name: 'Confirmed',
        data: this.confirmedData
      }]
  };

  ngOnInit(): void {
    this.corvid.getAllTheCountriesData().subscribe((data: any) => {
      if (data) {
        this.countryData = data;
      }
    });
    this.onCountrySelected('US');
  }

  onCountrySelected(country: string) {
    if (country == "USA"){
      country = "US";
    } else if ( country == "UK" ){
      country="United Kingdom";
    }
    this.corvid.getCorvidEachCountry(country).subscribe((data: any) => {
      this.recoveryData.length = 0;
      this.confirmedData.length = 0;
      this.deathData.length = 0;
      this.date.length = 0;
      Object.keys(data).forEach(item => {
        this.deathData.push(data[item].Deaths);
        this.recoveryData.push(data[item].Recovered);
        this.confirmedData.push(data[item].Confirmed);
        this.date.push(data[item].Date.slice(0,10));
      });
      this.corvid.getTodayData(country).subscribe((data: any) => {
        this.deathData.push(data.deaths);
        this.confirmedData.push(data.cases);
        this.recoveryData.push(data.recovered);
        this.date.push(new Date().toISOString().slice(0,10));
        this.updateFlag = true;
      });
    });
  }
}
