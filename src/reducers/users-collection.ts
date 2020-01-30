import { IUserCollection } from "../types/users-collection";
import { 
  userCollectionActionTypes,
  FETCH_USERS_COLLECTION_REQUEST,
  FETCH_USERS_COLLECTION_SUCCESS,
  FETCH_USERS_COLLECTION_FAILURE,
  ADD_USERS_COLLECTION,
  EDIT_USERS_COLLECTION,
  SET_SELECTED_COLLECTION      
} from "../types/actions-users-collection";
import { ICollection } from "../types/collection";

export interface IStateUsersCollection {
  users:IUserCollection[];
  isLoading: boolean;
  error:null|string;
  selectedCollection:null | ICollection
}

const usersCollectionReducerDefaultState: IStateUsersCollection = {
  users: [],
  isLoading:true,
  error: null,
  selectedCollection:null
};

const updateUsers = (
          arr: IUserCollection[], 
          userPermission:IUserCollection 
  ):IUserCollection[] => {
  const newArr:IUserCollection[] = arr.map(item => {
    if (item.id === userPermission.id) {
      return {...item, ...userPermission}
    }
    return item;
    
  })
  return newArr
}

export const usersCollectionReducer = (
  state = usersCollectionReducerDefaultState,
  action: userCollectionActionTypes
): IStateUsersCollection => {
  switch (action.type) {
    case FETCH_USERS_COLLECTION_REQUEST:
      return {...state,
        users:[],
        isLoading: true, 
        error: null,
        selectedCollection: null
        
      };
    case FETCH_USERS_COLLECTION_SUCCESS:
      return {...state,
        users: action.payload,
        isLoading: false, 
        error: null
      };
    case FETCH_USERS_COLLECTION_FAILURE:
      return {...state,
        users: [],
        isLoading: false, 
        error: action.payload,
        selectedCollection: null
      };
    case ADD_USERS_COLLECTION:
      return {...state,
        users: [...state.users, action.payload],
        isLoading: false, 
        error: null
      };
    case EDIT_USERS_COLLECTION:
      return {...state,
        users: updateUsers(state.users, action.payload),
        isLoading: false, 
        error: null
      };
    case SET_SELECTED_COLLECTION:
      return {...state,
        selectedCollection: action.payload
      };
    default:
      return state;
  }
};
