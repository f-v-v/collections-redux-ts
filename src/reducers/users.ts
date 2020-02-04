import { IUser } from "../types/user";
import { 
  userActionTypes,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "../types/actions-users";

export interface IStateUsers {
  users:IUser[];
  isLoading: boolean;
  error:null|string;
}

const collectionsReducerDefaultState: IStateUsers = {
  users: [],
  isLoading:true,
  error: null
};

export const usersReducer = (
  state = collectionsReducerDefaultState,
  action: userActionTypes
): IStateUsers => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {...state,
        users:[],
        isLoading: true, 
        error: null
      };
    case FETCH_USERS_SUCCESS:
      return {...state,
        users: action.payload,
        isLoading: false, 
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {...state,
        users: [],
        isLoading: false, 
        error: action.payload
      };
    default:
      return state;
  }
};
