import {IUser} from "../types/user";
import { 
  loggedUserActionTypes,
  SET_LOGGED_USER
} from "../types/actions-logged-user";

export interface IStateLoggedUser {
  loggedUser:IUser | null
}

const loggedUserReducerDefaultState: IStateLoggedUser = {loggedUser:null};

export const loggedUserUserReducer = (
  state = loggedUserReducerDefaultState,
  action: loggedUserActionTypes
): IStateLoggedUser => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return {...state,
        loggedUser:action.payload,
      };
    default:
      return state;
  }
};

// export { collectionsUserReducer };