import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducers';


export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

/**
 * createFeatureSelector is a selector used to query the state.
 */
export const selectAuthState = createFeatureSelector<AppState>('auth');