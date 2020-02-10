import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { IStateUsersCollection } from '../../reducers/users-collection'
import { IAppState } from '../../reducers'
import { connect } from 'react-redux'
import {
    usersCollectionRequested,
    fetchModifyUsersCollection,
    // getAllUsersCollection,
    // ModifyUserPermission
} from '../../actions/users-collection'
import { IUser } from '../../types/user'
import { Ipermissions } from '../../types/permissions'
import { ICollection } from '../../types/collection'
import { userCollectionActionTypes } from '../../types/actions-users-collection'
import CollectionPermissions from './collection-permissions'


interface RouteParams {
    id: string
}
type Props = LinkStateProps & LinkDispatchProps;

const ConteinerCollectionPermissions:React.FC<Props> = (props) => {
    const {usersCollection:{isLoading, error, users, selectedCollection},
    usersCollectionRequested, fetchModifyUsersCollection
        } = props

    const defaultUser:IUser = {
        id:0,
        name:'',
    }
    const defaultPermissions:Ipermissions = {
        use: true,
        edit: false,
        own: false
    }
    
    const history = useHistory()
    
    const {id} = useParams<RouteParams>();
    const idCollection = parseInt(id)

    const [showModal, setShowModal] = useState(false)
    const [currUser, setCurrUser] =useState(defaultUser)
    const [currPermissions, setCurrPermissions] =useState(defaultPermissions)
    useEffect(() => {
        // console.log('is useEffect in conteiner', idCollection)
        if (isNaN(idCollection)) {
            // history.push('/error')
            history.replace('/error');
        }
        usersCollectionRequested(idCollection)
    }, [idCollection])
    // const handlEdit = (user:IUser, permissions:Ipermissions):void => {
    //     setCurrUser(user)
    //     setCurrPermissions(permissions)
    //     setShowModal(true)
    // }
    //Заменили handlEdit на handlEditMemo, что бы работал Memo в дочерних компонентах.
    // иначе handlEdit была не равна сама себе в дочерних компонентах...
    const handlEditMemo = useCallback(
        (user:IUser, permissions:Ipermissions) => {
            setCurrUser(user)
            setCurrPermissions(permissions)
            setShowModal(true)
        },[]
    )

    const handlShowModalClose = () => {
        // setCurrUser(defaultUser)
        // setCurrPermissions(defaultPermissions)
        
        setShowModal(false)
    }
    const handlSave = (collection:ICollection, user:IUser, permissions: Ipermissions):void => {
        // editUserCollection(collection, user, permissions)
        fetchModifyUsersCollection(user, collection, permissions)
        setShowModal(false)
    }
    // debugger Разораться почему на старте вызывается 4 раз!!!!
    // console.log('is in conteiner props', props)
    // console.log('is in conteiner showModal', showModal)
    // console.log('is in conteiner currUser', currUser)
    // console.log('is in conteiner currPermissions', currPermissions)
    return (
        <CollectionPermissions users={users} isLoading={isLoading} isError={error}
                    selectedCollection={selectedCollection}
                    defaultUser={defaultUser} defaultPermissions={defaultPermissions} 
                    showModal={showModal} currUser={currUser} currPermissions={currPermissions}
                    handlEdit={handlEditMemo} handlSave={handlSave} 
                    handlShowModalClose={handlShowModalClose}/>
    )
}

interface LinkStateProps {
    usersCollection:IStateUsersCollection;
}
interface LinkDispatchProps {
    usersCollectionRequested:(id:number) => userCollectionActionTypes;
    fetchModifyUsersCollection:(
        user:IUser, 
        collection:ICollection, 
        permissions: Ipermissions) => userCollectionActionTypes
    // getAllUsersCollection: (id:number) => void;
    // ModifyUserPermission: (user: IUser, collection: ICollection, permissions: Ipermissions) => void
}

const mapStateToProps = ({usersCollection}:IAppState) => ({
    usersCollection,
});
   
const mapDispatchToProps = {
    usersCollectionRequested,
    fetchModifyUsersCollection,
    // getAllUsersCollection,
    // ModifyUserPermission
};

export default connect(mapStateToProps, mapDispatchToProps) (ConteinerCollectionPermissions)