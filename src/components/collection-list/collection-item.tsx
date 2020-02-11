import React from 'react'
import { ICollection } from '../../types/collection';
import { useHistory } from 'react-router-dom';
import { ICollectionUser } from '../../types/collections-user';

interface Props {
    item:ICollectionUser;
    index: number;
    onEdit:(collection:ICollection) =>void;
    // onPermission:(id:number) =>void;
    // onComposition:() =>void;
}

const CollectionItem: React.FC<Props> = props => {
    const  { item, index, onEdit} = props
    const history = useHistory()
    const tmpCollection:ICollection = {
        id:item.id,
        name:item.name,
        type:item.type,
        questions:item.questions,
        active:item.active,
    }
    const handlEdit = ():void => {
        onEdit(tmpCollection)
    }
    const handlPermission = () => {
        history.push(`collections/${item.id}`)
    }
    // console.log('I in collection-item')
    return (
        <div className="row">
            <div className="col-sm-1">{index}</div>
            <div className="col-sm-3 "><span className="align-middle">{item.name}</span></div>
            <div className="col-sm-1 align-middle">{item.type}</div>
            <div className="col-sm-1">{item.questions}</div>
            
            <div className="col-sm-2">
                <button 
                type="button" 
                className="btn btn-primary btn-sm " 
                onClick={handlEdit}
                disabled={!item.edit}
                >Редактировать</button>
            </div>
            <div className="col-sm-2">
                <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={handlPermission}
                    disabled={!item.own}
                >Разрешения</button>
            </div>
            <div className="col-sm-2">
                <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    // onClick={onComposition}
                >Состав</button>
            </div>
        </div>
    )
}

export default React.memo(CollectionItem)