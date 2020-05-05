import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { of } from 'rxjs';

import { AuthService } from '../../services/auth.service';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  /**
   * Effect for Login.
   */
  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          console.log(user);
          return new LogInSuccess({ token: user.token, email: payload.email });
        })
      )
        .pipe(catchError((error) => {
          console.log(error);
          return of(new LogInFailure({ error: error }));
        }));
    }));

  /**
   * Effect for Login success.
   */

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      console.log("In here at loginsuccess effects");
      localStorage.setItem('token', user.payload.token);
      console.log('Going to home page');
      this.router.navigateByUrl('/home');
    })
  );

  /**
  * Effect for Login failure.
  */

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  /**
    * Effect for Signup.
   */

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {

      return this.authService.signUp(payload.name, payload.email, payload.password)
        .pipe(map((user) => {
          console.log(user);
          return new SignUpSuccess({ token: user.token, Name: payload.name, email: payload.email });
        })).pipe(
          catchError((error) => {
            console.log(error);
            return of(new SignUpFailure({ error: error }));
          }));
    }));

  /**
  * Effect for Signup success.
  */

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('/log-in');
    })
  );

  /**
   * Effect for Signup failure.
   */

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );
  /**
    * Effect for Logout failure.
   */

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

}