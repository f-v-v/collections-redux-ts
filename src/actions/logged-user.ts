import { IUser } from "../types/user"
// import {IStateCollectionsUser} from "../reducers/collectionsUser"
import { 
  loggedUserActionTypes,
  SET_LOGGED_USER
} from "../types/actions-logged-user";
// import {getCollectionsByIdUser} from '../services/service'

// const logedUser:IUser|{} = {}; 


export const setLoggedUser = (user:IUser):loggedUserActionTypes => {
    return {
        type: SET_LOGGED_USER ,
        payload: user
    }
};