import { IUser } from "../types/user"
// import { ThunkAction } from 'redux-thunk'
// import { IStateUsers } from "../reducers/users";
import { 
     userActionTypes,
     FETCH_USERS_REQUEST,
     FETCH_USERS_SUCCESS,
     FETCH_USERS_FAILURE,
     FETCH_USERS_REQUESTING
} from "../types/actions-users";

// type ThunkResult<R> = ThunkAction<R, IStateUsers, undefined, userActionTypes>;

export const UsersRequesting = ():userActionTypes => {
    return {type: FETCH_USERS_REQUESTING }
};

export const UsersRequested = ():userActionTypes => {
    return {type: FETCH_USERS_REQUEST }
};

export const UsersLoaded = (users:IUser[]):userActionTypes => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};
export const UsersError = (error:string):userActionTypes => {
    return {
        type: FETCH_USERS_FAILURE,
        payload:error
    }
};

// export const getUsers = ():ThunkResult<void> => (dispatch) => {
//     dispatch(UsersRequested());
//     getAllUsers().then (
//         (users) => dispatch(UsersLoaded(users)), 
//         (error) => dispatch(UsersError(error.message))
//     )
// }

