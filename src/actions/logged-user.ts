import { IUser } from "../types/user"
import { 
  loggedUserActionTypes,
  SET_LOGGED_USER
} from "../types/actions-logged-user";

export const setLoggedUser = (user:IUser):loggedUserActionTypes => {
    return {
        type: SET_LOGGED_USER ,
        payload: user
    }
};