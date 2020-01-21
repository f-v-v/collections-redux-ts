import { ICollection } from "../types/collection"
import {IUser} from '../types/user'
import {ICollectionUser} from '../types/collections-user'
import {IUserCollection} from '../types/user-collections'
import collectionsTable from './collections'
import userTable from './users'
import userCollectionTable from './users-collections'
import { clearScreenDown } from "readline"
  
// function getAllUserCollection (): Promise<IUserCollection[]> {

// }

function _getCollectionsByIdUser (idUser:number):ICollectionUser[]  {
  const arr = userCollectionTable.filter(item => item.idUser === idUser)

  return arr.map( item => {
    const collection:ICollection = collectionsTable.filter(coll => coll.id === item.idCollection)[0]
    const collectionUser:ICollectionUser =  {
      id:collection.id,
      name: collection.name,
      type: collection.type,
      questions: collection.questions,
      use: item.use,
      edit: item.edit,
      own: item.own,
      active:collection.active
    }
    return collectionUser
  })
}

function _getUsersByIdCollection (idCollection:number): IUserCollection[] {
  const arr = userCollectionTable.filter(item => item.idCollection === idCollection)
  
  return arr.map( item => {
    const user:IUser = userTable.filter(user => user.id === item.idUser)[0]
    const Usercollection:IUserCollection =  {
      id: user.id,
      name: user.name,
      use: item.use,
      edit: item.edit,
      own: item.own,
    }
    return Usercollection
  })
}


function getAllCollections(): Promise<ICollection[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.75) {
        reject(new Error('Something bad happened'));
      } else {
        resolve([...collectionsTable]);
      }
    }, 700);
  });
}

function getCollectionById(idCollection:number): Promise<ICollection> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.75) {
        reject(new Error('Something bad happened'));
      } else {
        const collection:ICollection |undefined = collectionsTable.find(item => item.id === idCollection )
        resolve(collection);
        // доработать!
      }
    }, 700);
  });
}

function getCollectionsByIdUser(idUser:number): Promise<ICollectionUser[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.75) {
        reject(new Error('Something bad happened'));
      } else {
        resolve(_getCollectionsByIdUser(idUser));
      }
    }, 700);
  });
}



function getAllUsers(): Promise<IUser[]> {
  // console.log("i in getAllUserS")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.95) {
        reject(new Error('Something bad happened'));
      } else {
        resolve([...userTable]);
      }
    }, 700);
  });
}

function getUserById(idUser:number): Promise<IUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.75) {
        reject(new Error('Something bad happened'));
      } else {
        const collection:IUser |undefined = userTable.find(item => item.id === idUser )
        resolve(collection);
        // доработать!
      }
    }, 700);
  });
}

function getUsersByIdCollection(idCollection:number): Promise<IUserCollection[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.75) {
        reject(new Error('Something bad happened'));
      } else {
        resolve(_getUsersByIdCollection(idCollection));
      }
    }, 700);
  });
}

export {getAllCollections, 
        getCollectionById,
        getCollectionsByIdUser,
        getAllUsers,
        getUserById,
        getUsersByIdCollection
      }