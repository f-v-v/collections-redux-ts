import { IUser } from "./user";

export const SET_LOGGED_USER = 'SET_LOGGED_USER';

export interface setLoggedUser {
  type: typeof SET_LOGGED_USER;
  payload:IUser
}

export type loggedUserActionTypes =
  | setLoggedUser