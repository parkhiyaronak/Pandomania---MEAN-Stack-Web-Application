import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NgForm} from '@angular/forms';

import { Observable } from 'rxjs';

import {Donationsapi} from '../services/donation.service';

import { AppState, selectAuthState } from '../store/app.states';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

/**
 * A variable for posting a donation.
 * A varaible for storing the state of application.
 * A variable for routing to components.
 * @param service 
 * @param store 
 * @param router 
 */
  constructor(public service:Donationsapi, private store: Store<AppState>, private router:Router) {
    this.getState = this.store.select(selectAuthState);
  }
  
  ngOnInit(): void{
     this.formElements();
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  /**
   * This method contains variables to hold the values of the data submitted from form.
   * @param form 
   */
  formElements(form? :NgForm){
    this.service.formData={
      _id:'',
      name:'',
      email:'',
      Date:null,
      description:'',
      item:'',
      quantity:null,
      address:'',
      phone:'',
      donation_by:''
      }  
    
}

/**
 * On submit on HTML form this method is invoked.
 * @param form 
 */
  onSubmit(form:NgForm){
    form.value.donation_by = this.user.email;
    this.insertRecord(form);
  }
  /**
   * This function posts the contents of form to the "POST" method.
   * @param form 
   */

  insertRecord(form:NgForm){
    this.service.postDonations(form.value)
    .subscribe(res=>{
    this.formElements(form)
    this.router.navigateByUrl('/donations');
    })
  }
  onChange(){

  }

}