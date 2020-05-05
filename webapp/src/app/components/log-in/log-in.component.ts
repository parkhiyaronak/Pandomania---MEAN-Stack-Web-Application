import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {


  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  loginForm: FormGroup;
  submitted = false;


  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthState);
  }


  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  /**
 * This method is called when the user submits the request to login.
 * Payload of email and password is dipatched to the store.
 */
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const payload = this.loginForm.value;
    this.store.dispatch(new LogIn(payload));
  }

}











