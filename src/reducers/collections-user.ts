import { ICollectionUser } from "../types/collections-user";
import { 
  CollectionActionTypes,
  FETCH_COLLECTIONS_FAILURE,
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS      
} from "../types/actions-collections";

export interface IStateCollectionsUser {
  collections:ICollectionUser[];
  isLoading: boolean;
  error:null|string;
}

const collectionsReducerDefaultState: IStateCollectionsUser = {
  collections: [],
  isLoading:true,
  error: null
};

export const collectionsUserReducer = (
  state = collectionsReducerDefaultState,
  action: CollectionActionTypes
): IStateCollectionsUser => {
  switch (action.type) {
    case FETCH_COLLECTIONS_REQUEST:
      return {...state,
        collections:[],
        isLoading: true, 
        error: null
      };
    case FETCH_COLLECTIONS_SUCCESS:
      return {...state,
        collections: action.payload,
        isLoading: false, 
        error: null
      };
    case FETCH_COLLECTIONS_FAILURE:
      return {...state,
        collections: [],
        isLoading: false, 
        error: action.payload
      };
    default:
      return state;
  }
};

// export { collectionsUserReducer };