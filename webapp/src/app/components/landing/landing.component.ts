import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

/**
 * This is the landing component when user wishes to signin/signup.
 */

export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
  
    });
  }
/**
 * This method is called when the user chooses to logout from their profile.
 */
  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}