import {
  Component,
  OnInit,
  AfterViewInit,
  NgZone,
  ViewChild,
} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { CovidService } from '../../services/covid.service';
import {countryCodes} from '../../services/covid.service';
import { combineLatest } from 'rxjs';
import Fuse from 'fuse.js'



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // constructor() { }
  
  public fuse: any;
  public fuseResults: any[];
  public timeLine: any;
  private mapChart: am4maps.MapChart;

  
  public isLoadingMap: boolean = true;

  public totalCases;
  public totalDeaths;
  public totalRecoveries;
  public totalCritical;
  public activeCases;


  public countryCodes = countryCodes;
  

  public countries: any = [];
  calculateSum(index, array = this.countries) {
    var total = 0
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][index]
    }
    return total
  }

  constructor(private zone: NgZone, private getCovidService: CovidService) {

  }

  // ngOnInit(): void {
  // }
  /**
   * Setting all the required data on Init
   */
  async ngOnInit() {
    this.zone.runOutsideAngular(async () => {
      combineLatest(
        this.getCovidService.getAll(this),
        this.getCovidService.getTimelineGlobal()
     )
     .subscribe(([getAllData, getTimelineData]) => {
      this.isLoadingMap = false;
      this.countries = getAllData;
      this.totalCases = this.calculateSum("cases");
      this.totalDeaths = this.calculateSum("deaths");
      this.totalRecoveries = this.calculateSum("recovered");
      this.totalCritical = this.calculateSum("critical");
      this.activeCases = this.calculateSum("active");
      this.fuse = new Fuse(this.countries, {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
          "country"
        ]
      });
      this.timeLine = getTimelineData;
      this.loadMap("cases");
     });
    });
  }


  loadMap(option) {
    //this.isLoadingMap=true;
    if (this.mapChart) {
      this.mapChart.dispose();
    }
    let color = "#89B4C1";
    if (option == "deaths") {
      color = "#FF6B6B";
    } else if (option == "recovered") {
      color = "#57D596";
    } else if (option == "critical") {
      color = "#F9CD62";
    } else if (option == "active") {
      color = "#D9B8D5";
    }
    let mapData = [];
   // console.log(this.fuse.list);
    this.fuse.list.forEach(element => {
      if(element[option]!=0){
        mapData.push({
          id: this.countryCodes[element.country],
          name: element.country,
          value: element[option],
          color: am4core.color(color)
        });
      }
    });

    let chartMap = am4core.create("worldChart", am4maps.MapChart);
    // Seting  map definition
    chartMap.geodata = am4geodata_worldLow;

    // Seting projection
    chartMap.projection = new am4maps.projections.Miller();

    // Creating map polygon series
    let polygonSeries = chartMap.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    let imageSeries = chartMap.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "value";

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = "color";
    circle.tooltipText = "{name}: [bold]{value}[/]";

    chartMap.events.on("ready",()=>{
      this.isLoadingMap = false;
    })

    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 4,
      "max": 30,
      "dataField": "value"
    })

    imageTemplate.adapter.add("latitude", function (latitude, target) {
      let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext["id"]);
      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    })

    imageTemplate.adapter.add("longitude", function (longitude, target) {
      let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext["id"]);
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    })
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#282d37");
    polygonTemplate.stroke = am4core.color("#313a46")
    this.mapChart = chartMap;
  }

}
