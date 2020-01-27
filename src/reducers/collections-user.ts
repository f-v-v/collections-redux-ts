import { ICollectionUser } from "../types/collections-user";
import { 
  collectionUserActionTypes,
  FETCH_COLLECTIONS_USER_FAILURE,
  FETCH_COLLECTIONS_USER_REQUEST,
  FETCH_COLLECTIONS_USER_SUCCESS,
  ADD_COLLECTIONS_USER,
  EDIT_COLLECTIONS_USER      
} from "../types/actions-collections-user";
import { ICollection } from "../types/collection";

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

const updateCollections = (arr: ICollectionUser[], collection:ICollection ):ICollectionUser[] => {
  const newArr:ICollectionUser[] = arr.map(item => {
    if (item.id === collection.id) {
      // return {
      //   id: item.id,
      //   name: collection.name,
      //   type: collection.type,
      //   questions: collection.questions,
      //   active: collection.active,
      //   use: item.use,
      //   edit: item.edit,
      //   own: item.own
      // }
      return {...item, ...collection}
    }
    return item;
    
  })
  return newArr
}

export const collectionsUserReducer = (
  state = collectionsReducerDefaultState,
  action: collectionUserActionTypes
): IStateCollectionsUser => {
  switch (action.type) {
    case FETCH_COLLECTIONS_USER_REQUEST:
      return {...state,
        collections:[],
        isLoading: true, 
        error: null
      };
    case FETCH_COLLECTIONS_USER_SUCCESS:
      return {...state,
        collections: action.payload,
        isLoading: false, 
        error: null
      };
    case FETCH_COLLECTIONS_USER_FAILURE:
      return {...state,
        collections: [],
        isLoading: false, 
        error: action.payload
      };
    case ADD_COLLECTIONS_USER:
      return {...state,
        collections: [...state.collections, action.payload],
        isLoading: false, 
        error: null
      };
    case EDIT_COLLECTIONS_USER:
      return {...state,
        collections: updateCollections(state.collections, action.payload),
        isLoading: false, 
        error: null
      };
    default:
      return state;
  }
};
