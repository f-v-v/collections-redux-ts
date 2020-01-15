import { ICollection } from "../types/collection";
import { CollectionActionTypes } from "../types/actions";

const collectionsReducerDefaultState: ICollection[] = [];

const collectionReducer = (
  state = collectionsReducerDefaultState,
  action: CollectionActionTypes
): ICollection[] => {
  switch (action.type) {
    case "GET_COLLECTIONS":
      return action.collection;
    default:
      return state;
  }
};

export { collectionReducer };