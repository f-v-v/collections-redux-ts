import React, { useEffect, useState } from 'react'
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
import SelectedCollection from '../selected-collection'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
// import { ModalCollectionPermission } from '../modal-collection-permission/modal-collection-permission'
import { ModalCollectionPermission } from '../collection-user-permission'
import { IUser } from '../../types/user'
import { Ipermissions } from '../../types/permissions'
import { ICollection } from '../../types/collection'
import { userCollectionActionTypes } from '../../types/actions-users-collection'
import {ItemsPermissions} from '../items-permissions'


interface RouteParams {
    id: string
}
type Props = LinkStateProps & LinkDispatchProps;

const CollectionPermissions:React.FC<Props> = (props) => {
    const {usersCollection:{isLoading, users, error, selectedCollection},
    usersCollectionRequested, fetchModifyUsersCollection
        } = props
    const ok:JSX.Element = <i className="fa fa-check-square-o"></i>
    const not:JSX.Element = <i className="fa fa-minus-square-o"></i>

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
        if (isNaN(idCollection)) {
            // history.push('/error')
            history.replace('/error');
        }
        usersCollectionRequested(idCollection)
    }, [idCollection])
    const handlEdit = (user:IUser, permissions:Ipermissions):void => {
        setCurrUser(user)
        setCurrPermissions(permissions)
        setShowModal(true)
    }
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

    if (isLoading) {
        return <Spinner />
    }
    
    if (error) {
        return <ErrorIndicator error={error} />
    }
    return (
        <>
        <SelectedCollection collection={selectedCollection}/>
        <ItemsPermissions items={users} onEdit={handlEdit} />
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <button 
                        type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={() => handlEdit (defaultUser, defaultPermissions)}    
                    >Добавить</button>
                </div>
            </div>
        </div>
        <ModalCollectionPermission 
            onClose={handlShowModalClose} 
            show={showModal}
            onSave={handlSave}
            collection={selectedCollection!} // разобраться
            user={currUser}
            permission={currPermissions}
        />
        </>
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

export default connect(mapStateToProps, mapDispatchToProps) (CollectionPermissions)