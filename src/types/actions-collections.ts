import { ICollectionUser } from "./collections-user";

// action strings

export const FETCH_COLLECTIONS_REQUEST = 'FETCH_COLLECTIONS_REQUEST';
export const FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_FAILURE = 'FETCH_COLLECTIONS_FAILURE';


export interface collectionsRequested {
  type: typeof FETCH_COLLECTIONS_REQUEST;
}

export interface collectionsLoaded {
  type: typeof FETCH_COLLECTIONS_SUCCESS;
  payload:ICollectionUser[]

}

export interface collectionsError {
  type: typeof FETCH_COLLECTIONS_FAILURE;
  payload: string

}


export type CollectionActionTypes =
  | collectionsRequested
  | collectionsLoaded
  | collectionsError;


// export type AppActions = CollectionActionTypes;