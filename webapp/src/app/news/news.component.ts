import { Component, OnInit } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { news } from '../models/news.model';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(private service: CovidService) { }
  
  newsData : news[] = [];
  ngOnInit(): void {
    this.service.getUpdatedNews().subscribe(data => {

      console.log(data);
      this.newsData = data['articles'];
      });;
  }

}
