import { IUser } from "./user";

// action strings

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export interface usersRequested {
  type: typeof FETCH_USERS_REQUEST;
}

export interface usersLoaded {
  type: typeof FETCH_USERS_SUCCESS;
  payload:IUser[]

}

export interface usersError {
  type: typeof FETCH_USERS_FAILURE;
  payload: string

}


export type userActionTypes =
  | usersRequested
  | usersLoaded
  | usersError;


// export type AppActions = CollectionActionTypes;