import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Donations} from '../models/donations';
import {Donationsapi} from '../services/donation.service'

import { AppState, selectAuthState } from '../store/app.states';


@Component({
  selector: 'app-donationslanding',
  templateUrl: './donationslanding.component.html',
  styleUrls: ['./donationslanding.component.scss']
})
export class DonationslandingComponent implements OnInit {

  lstdonations:Donations[];

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;


  constructor(
    private store: Store<AppState>,
    private router: Router,
    private _donationsapi:Donationsapi
    
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  /**
   * Fetching the data from Donations API and subscribing to it.
   */

  ngOnInit(): void {
    this._donationsapi.getDonations()
    .subscribe(
      data=>{
          this.lstdonations=data;
      }
    );

    
  /**
   * to get the authenticated current user
   */
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }
  


}
