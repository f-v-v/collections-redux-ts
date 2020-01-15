import { ICollection } from "./collection";

// action strings
export const GET_COLLECTIONS = "GET_COLLECTIONS";


export interface SetExpenseAction {
  type: typeof GET_COLLECTIONS;
  collection: ICollection[];
}



export type CollectionActionTypes =
  | SetExpenseAction


export type AppActions = CollectionActionTypes;