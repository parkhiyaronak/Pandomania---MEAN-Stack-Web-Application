import { Component, OnInit } from '@angular/core';

declare const myFunction: any;
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {

  }
  onClick(){
    console.log("I am here");
    myFunction();
  }







}
