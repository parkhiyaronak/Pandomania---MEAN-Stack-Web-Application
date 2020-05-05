import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../store/app.states';
import { LogOut } from '../store/actions/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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

  logOut(): void {
    this.store.dispatch(new LogOut);
  }


}
