import { Action } from '@ngrx/store';

/**
 * This class is actions class derived from ngrx store.
 */
export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
}

/**
 * Implements LogIn action.
 */
export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}
/**
 * Implements LogIn success action.
 */

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
 
}
/**
 * Implements LogIn failure action.
 */

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

/**
 * Implements Signup action.
 */

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

/**
 * Implements Signup success action.
 */

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any ) {}
}
/**
 * Implements Signup failure action.
 */

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

/**
 * Implements Logout action.
 */

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut;