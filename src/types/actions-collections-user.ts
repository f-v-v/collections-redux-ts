import { ICollectionUser } from "./collections-user";
import { ICollection } from "./collection";

// action strings

export const FETCH_COLLECTIONS_USER_REQUEST = 'FETCH_COLLECTIONS_REQUEST';
export const FETCH_COLLECTIONS_USER_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_USER_FAILURE = 'FETCH_COLLECTIONS_FAILURE';
export const ADD_COLLECTIONS_USER = 'ADD_COLLECTIONS_USER';
export const EDIT_COLLECTIONS_USER = 'EDIT_COLLECTIONS_USER';

export const FETCH_ADD_COLLECTIONS_USER = 'FETCH_ADD_COLLECTIONS_USER';
export const FETCH_EDIT_COLLECTIONS_USER = 'FETCH_EDIT_COLLECTIONS_USER';

export interface fetchAddCollectionsUserAction {
  type: typeof FETCH_ADD_COLLECTIONS_USER;
  payload:ICollection
}

export interface fetchEditCollectionsUserAction {
  type: typeof FETCH_EDIT_COLLECTIONS_USER;
  payload:ICollection
}

export interface collectionsUserRequested {
  type: typeof FETCH_COLLECTIONS_USER_REQUEST;
}

export interface collectionsUserLoaded {
  type: typeof FETCH_COLLECTIONS_USER_SUCCESS;
  payload:ICollectionUser[]
}

export interface collectionsUserError {
  type: typeof FETCH_COLLECTIONS_USER_FAILURE;
  payload: string
}

export interface collectionsUserAdd {
  type: typeof ADD_COLLECTIONS_USER;
  payload:ICollectionUser
}

export interface collectionsUserEdit {
  type: typeof EDIT_COLLECTIONS_USER;
  payload:ICollection
}


export type collectionUserActionTypes =
  | collectionsUserRequested
  | collectionsUserLoaded
  | collectionsUserError
  | collectionsUserAdd
  | collectionsUserEdit
  | fetchAddCollectionsUserAction
  | fetchEditCollectionsUserAction;
  