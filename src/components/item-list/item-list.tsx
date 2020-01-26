import React, {useEffect} from 'react'
import {ICollectionUser} from '../../types/collections-user'
import { IStateCollectionsUser } from '../../reducers/collections-user';
import { IAppState } from '../../reducers';
import {getAllCollectionsUser} from '../../actions/collections-user'
import { connect } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

// type ListProps = {
//     collections: ICollectionUser[]
// }

type Props = LinkStateProps & LinkDispatchProps;

const ItemList: React.FC<Props> = props => {
    const  {collectionsUser:{isLoading, collections, error}, getAllCollectionsUser } = props
    useEffect(() => {
        // TODO вызов из action getAllCollectionsUser
        getAllCollectionsUser()
    }, [])

    if (isLoading) {
        return <Spinner />
    }
    
    if (error) {
        return <ErrorIndicator error={error} />
    }

    return (
        <ul className="list-group">
            <div className="container-fluid">
            {collections.map((item, index) => {
                return(
                    <li className={"list-group-item" + (item.active?"":" bg-danger")} key={item.id}>
                        {/* <div className={"row" + (item.active?"":" bg-danger")}> */}
                        <div className="row">
                            <div className="col-sm-1">{index}</div>
                            <div className="col-sm-3 "><span className="align-middle">{item.name}</span></div>
                            <div className="col-sm-1 align-middle">{item.type}</div>
                            <div className="col-sm-1">{item.questions}</div>
                            
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-primary btn-sm " >Редактировать</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-primary btn-sm">Разрешения</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-primary btn-sm">Состав</button>
                            </div>
                        </div>
                    </li>
                )
            })
            }
            </div>

        </ul>
      
    )
}

interface LinkStateProps {
    collectionsUser:IStateCollectionsUser;
}
interface LinkDispatchProps {
    getAllCollectionsUser: () => void;
}

const mapStateToProps = ({collectionsUser}:IAppState) => ({
    collectionsUser,
});
   
   const mapDispatchToProps = {
    getAllCollectionsUser,
   };

export default connect(mapStateToProps, mapDispatchToProps) (ItemList)