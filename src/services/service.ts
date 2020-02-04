import { ICollection, ICollection_} from "../types/collection"
import {IUser} from '../types/user'
import {ICollectionUser} from '../types/collections-user'
import {IUserCollection} from '../types/users-collection'
import collectionsTable from './collections'
import userTable from './users'
import userCollectionTable from './users-collections'
import { Ipermissions } from "../types/permissions"

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
    const UserCollection:IUserCollection =  {
      id: user.id,
      name: user.name,
      use: item.use,
      edit: item.edit,
      own: item.own,
    }
    return UserCollection
  })
}

function _addCollection (collection: ICollection_): ICollection {
  // Т.к. это простейшая имуляция бд, Id Коллекции пока берем исходя их длинны массива!
  // TODO переписать - поиск max id => +1
  const idCollection = collectionsTable.length + 1
  collectionsTable.push({
    id: idCollection,
    name: collection.name,
    type: collection.type,
    questions: collection.questions,
    active:collection.active,
  })
  return {
    id: idCollection,
    name: collection.name,
    type: collection.type,
    questions: collection.questions,
    active: collection.active,
  }
}

function _addCollectionsByIdUser (idUser:number, collection: ICollection_): ICollectionUser {
  const c:ICollection = _addCollection(collection)
  userCollectionTable.push({
    idUser,
    idCollection: c.id,
    use:true,
    edit: true,
    own:true
  })
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    questions: c.questions,
    active: c.active,
    use: true,
    edit: true,
    own: true
  }
}

// function _addPermissionsByIdUserIdcollection (User:IUser, idCollection:number , permissions: Ipermissions): IUserCollection {
//    userCollectionTable.push(
//   //   {
//   //   idUser,
//   //   idCollection,
//   //   use:true,
//   //   edit: true,
//   //   own:true
//   // }
//     {idUser: User.id, idCollection, ...permissions}
//   )
//   return {
//     ...User, ...permissions
//   }
// }

// function _editUserPermissions (collection: ICollection, user: IUser, permissions: Ipermissions): IUserCollection {
//   userCollectionTable.forEach(item => {
//     if (item.idUser === user.id  && item.idCollection === collection.id) { 
//         item.use = permissions.use
//         item.edit = permissions.edit
//         item.own = permissions.own
//     }
//   })
//   //для простоты пока возвращаем тот же объект что и приняли
//   // хотя нало сделать заново поиск по такблице
//   return {...user, ...permissions}
// }

function _addEditPermissionsByIdUserIdcollection (user:IUser, idCollection:number , permissions: Ipermissions): IUserCollection {
  // debugger
  const findIndex:number = userCollectionTable.findIndex((item) =>{
    return (item.idUser === user.id && item.idCollection === idCollection)
  })
  if (findIndex > -1) {
    userCollectionTable[findIndex] = {idUser: user.id, idCollection, ...permissions}
  } else {
    userCollectionTable.push(
      {idUser: user.id, idCollection, ...permissions}
    )
  }
  return {
    ...user, ...permissions
  }
}

//нужен ли тут idUser??!! и что возвращять ICollectionUser или ICollection
function _editCollections (collection: ICollection): ICollection {
  // Этот код работает но это сайдэффект, map не должен менять исходный массив!
  // надо переписать!
  // collectionsTable.map( item => {
  //   if (item.id === collection.id) {
  //     item.name = collection.name
  //     item.type = collection.type
  //     item.questions = collection.questions
  //     item.active = collection.active
  //   })

  //переписал
  collectionsTable.forEach(item => {
    if (item.id === collection.id) { 
        item.name = collection.name
        item.type = collection.type
        item.questions = collection.questions
        item.active = collection.active
    }
  })
  //для простоты пока возвращаем тот же объект что и приняли
  // хотя нало сделать заново поиск по такблице
  return collection
}



function getAllCollections(): Promise<ICollection[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.98) {
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
      if (Math.random() > 0.98) {
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
      if (Math.random() > 0.98) {
        reject(new Error('Something bad happened'));
      } else {
        resolve(_getCollectionsByIdUser(idUser));
      }
    }, 700);
  });
}

function addCollectionByIdUser(idUser:number, collection:ICollection_): Promise<ICollectionUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.98) {
        reject(new Error('Error add in DataBase'));
      } else {
        // console.log('add collectionTable', collectionsTable)
        resolve(_addCollectionsByIdUser(idUser, collection));
      }
    }, 700);
  });
}

// function addPermissionsByUserCollection(User:IUser, collection:ICollection, permissions: Ipermissions): Promise<IUserCollection> {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.98) {
//         reject(new Error('Error add in DataBase'));
//       } else {
//         console.log('add collectionTable', collectionsTable)
//         resolve(_addPermissionsByIdUserIdcollection(User, collection.id, permissions));
//       }
//     }, 700);
//   });
// }

function editCollections(collection:ICollection): Promise<ICollection> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.98) {
        reject(new Error('Error add in DataBase'));
      } else {
        // console.log('Edit collectionTable', collectionsTable)
        resolve(_editCollections(collection));
      }
    }, 700);
  });
}

// function editUserPermissions(collection:ICollection , user:IUser, permissions: Ipermissions): Promise<IUserCollection> {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.98) {
//         reject(new Error('Error add in DataBase'));
//       } else {
//         resolve(_editUserPermissions(collection, user, permissions ));
//       }
//     }, 700);
//   });
// }

function addEditPermissionsByUserCollection(User:IUser, collection:ICollection, permissions: Ipermissions): Promise<IUserCollection> {
  // console.log('addEditPermissions collectionTable', collectionsTable)
  // debugger
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.98) {
        reject(new Error('Error add in DataBase'));
      } else {
        // console.log('add collectionTable', collectionsTable)
        resolve(_addEditPermissionsByIdUserIdcollection(User, collection.id, permissions));
      }
    }, 700);
  });
}

function getAllUsers(): Promise<IUser[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.98) {
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
      if (Math.random() > 0.98) {
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
      if (Math.random() > 0.98) {
        reject(new Error('Something bad happened'));
      } else {
        resolve(_getUsersByIdCollection(idCollection));
      }
    }, 700);
  });
}

export {
  getAllCollections, 
  getCollectionById,
  getCollectionsByIdUser,
  getAllUsers,
  getUserById,
  getUsersByIdCollection,
  addCollectionByIdUser,
  editCollections,
  // editUserPermissions,
  // addPermissionsByUserCollection,
  addEditPermissionsByUserCollection
}