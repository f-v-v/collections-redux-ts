// import { ThunkAction } from 'redux-thunk'
// import {IStateCollectionsUser} from "../reducers/collections-user"
// import {IAppState} from '../reducers'
import { 
  userCollectionActionTypes,
  FETCH_USERS_COLLECTION_REQUEST,
  FETCH_USERS_COLLECTION_SUCCESS,
  FETCH_USERS_COLLECTION_FAILURE,
  ADD_USERS_COLLECTION,
  EDIT_USERS_COLLECTION,
  SET_SELECTED_COLLECTION,
  FETCH_MODIFY_USERS_COLLECTION      
} from "../types/actions-users-collection";
import { ICollection } from "../types/collection";
// import { Action } from "redux";
import { IUserCollection } from "../types/users-collection";
import { IUser } from '../types/user';
import { Ipermissions } from '../types/permissions';
// import {Action} from 'redux'

// type ThunkResult<R> = ThunkAction<R, IAppState, undefined, userCollectionActionTypes>;
// type ThunkResult<R> = ThunkAction<R, IAppState, undefined, Action>;
// type MyThunkDispatch = ThunkDispatch<IAppState, undefined, Action>;

export const fetchModifyUsersCollection = (
    user:IUser, 
    collection:ICollection,
    permissions:Ipermissions
    ):userCollectionActionTypes => {
    return {
        type: FETCH_MODIFY_USERS_COLLECTION,
        user, 
        collection,
        permissions 
    }
};

export const usersCollectionRequested = (idCollection:number):userCollectionActionTypes => {
    return {
        type: FETCH_USERS_COLLECTION_REQUEST,
        payload:idCollection
    }
};

export const usersCollectionLoaded = (collections:IUserCollection[]):userCollectionActionTypes => {
    return {
        type: FETCH_USERS_COLLECTION_SUCCESS,
        payload: collections
    }
};
export const usersCollectionError = (error:string):userCollectionActionTypes => {
    return {
        type: FETCH_USERS_COLLECTION_FAILURE,
        payload:error
    }
};
export const usersCollectionAdd = (user:IUserCollection):userCollectionActionTypes => {
    return {
        type: ADD_USERS_COLLECTION,
        payload:user
    }
};
export const usersCollectionEdit = (userPermission:IUserCollection):userCollectionActionTypes => {
    return {
        type: EDIT_USERS_COLLECTION,
        payload:userPermission
    }
};

export const setSelectedCollections = (collection:ICollection):userCollectionActionTypes => {
    return {
        type: SET_SELECTED_COLLECTION,
        payload:collection
    }
};


// export const getAllUsersCollection = (id:number):ThunkResult<void> => (dispatch, getState) => {
//     // dispatch(usersCollectionRequested());
//     getCollectionById(id).then(
//         (collection) => dispatch(setSelectedCollections(collection)),
//         (error) => dispatch(usersCollectionError(error.message))
//     ).then( ()=> {
//         const idCollection:number|undefined = getState().usersCollection.selectedCollection?.id
//         if (!idCollection) return // если выбранная коллекция = undefined пока ничего не делаем!
//         getUsersByIdCollection(idCollection).then (
//             (users) => dispatch(usersCollectionLoaded(users)), 
//             (error) => dispatch(usersCollectionError(error.message))
//         )
//     })
// }

// // export const editUserCollection = (
// //                 collection:ICollection, 
// //                 user:IUser, 
// //                 permissions: Ipermissions
// //                 ):ThunkResult<void> => (dispatch) => {
// //     // console.log('i in editUserCollection')
// //     editUserPermissions(collection, user, permissions).then(
// //         (item) => dispatch(usersCollectionEdit(item)),
// //         (error:Error) => dispatch(usersCollectionError(error.message))
// //     )
// // }

// // // Подумать нужно ли тут использовать isLoading и error??!!
// // export const addUserPermission = (
// //     user:IUser, 
// //     collection:ICollection,
// //     permissions: Ipermissions    
// // ):ThunkResult<void> => (dispatch, getState) => {
// //     addPermissionsByUserCollection(user, collection, permissions).then(
// //         (userPermissions) => dispatch(usersCollectionAdd(userPermissions)),
// //         (error:Error) => dispatch(usersCollectionError(error.message))
// //     )
// // }

// export const ModifyUserPermission = (
//     user:IUser, 
//     collection:ICollection,
//     permissions: Ipermissions    
// ):ThunkResult<void> => (dispatch, getState) => {
//     addEditPermissionsByUserCollection(user, collection, permissions).then(
//         (userPermissions) => {
//             const tmp = getState().usersCollection.users.find((item) =>{
//                 return (item.id === userPermissions.id)
//             })
//             if (tmp) {
//                 dispatch(usersCollectionEdit(userPermissions))
//             } else {
//                 dispatch(usersCollectionAdd(userPermissions))
//             }
//             // dispatch(usersCollectionModify(userPermissions))
//         },
//         (error:Error) => dispatch(usersCollectionError(error.message))
//     )
// }


