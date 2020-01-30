import { IUserCollection } from "./users-collection";
import { ICollection } from "./collection";

export const FETCH_USERS_COLLECTION_REQUEST = 'FETCH_USERS_COLLECTION_REQUEST';
export const FETCH_USERS_COLLECTION_SUCCESS = 'FETCH_USERS_COLLECTION_SUCCESS';
export const FETCH_USERS_COLLECTION_FAILURE = 'FETCH_USERS_COLLECTION_FAILURE';
export const ADD_USERS_COLLECTION = 'ADD_USERS_COLLECTION';
export const EDIT_USERS_COLLECTION = 'EDIT_USERS_COLLECTION';
export const SET_SELECTED_COLLECTION = 'SET_SELECTED_COLLECTION';


export interface usersCollectionRequested {
  type: typeof FETCH_USERS_COLLECTION_REQUEST;
}

export interface usersCollectionLoaded {
  type: typeof FETCH_USERS_COLLECTION_SUCCESS;
  payload:IUserCollection[]
}

export interface usersCollectionError {
  type: typeof FETCH_USERS_COLLECTION_FAILURE;
  payload: string
}

export interface usersCollectionAdd {
  type: typeof ADD_USERS_COLLECTION;
  payload:IUserCollection
}

export interface usersCollectionEdit {
  type: typeof EDIT_USERS_COLLECTION;
  payload:IUserCollection
}

export interface setSelectedCollection {
  type: typeof SET_SELECTED_COLLECTION;
  payload:ICollection
}


export type userCollectionActionTypes =
  | usersCollectionRequested
  | usersCollectionLoaded
  | usersCollectionError
  | usersCollectionAdd
  | usersCollectionEdit
  | setSelectedCollection;
  