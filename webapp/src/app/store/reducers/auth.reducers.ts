import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

/**
 * Reducer function and cases to handle the state of the application.
 * @param state 
 * @param action 
 */
export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    default: {
      return state;
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          token: action.payload.token,
          name: action.payload.Name,
          email: action.payload.email
        },

        errorMessage: null
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

  }




}