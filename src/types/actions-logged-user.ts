import { IUser } from "./user";

// action strings

export const SET_LOGGED_USER = 'SET_LOGGED_USER';

export interface setLoggedUser {
  type: typeof SET_LOGGED_USER;
  payload:IUser
}

export type loggedUserActionTypes =
  | setLoggedUser

// export type AppActions = loggedUserActionTypes;