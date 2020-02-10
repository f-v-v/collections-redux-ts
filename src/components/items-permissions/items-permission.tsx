import React from 'react'
import { Ipermissions } from '../../types/permissions'
import ItemPermissions, {IItemPermissions, IItem} from './item-permission'

type Props = {
    items:IItemPermissions [],
    onEdit: (item:IItem, permissions:Ipermissions) => void //!!!!!
}

export const ItemsPermissions:React.FC<Props> = (props) => {
    const {items, onEdit} = props

    return (
        <ul className="list-group">
            <div className="container-fluid">
            <li className={"list-group-item"}>
                        <div className="row">
                            <div className="col-sm-1">Индекс</div>
                            <div className="col-sm-3 align-middle"><span className="align-middle">Имя</span></div>
                            <div className="col-sm-2 align-middle"><span className="align-middle">Использование</span></div>
                            <div className="col-sm-2 align-middle"><span className="align-middle">Редактирование</span></div>
                            <div className="col-sm-2 align-middle"><span className="align-middle">Владение</span></div>
                            
                        </div>
                    </li>
                {items.map((item, index) => {
                    return(
                        <li className={"list-group-item"} key={item.id}>
                        <ItemPermissions index={index} onEdit={onEdit} item={item}/>
                        </li>
                    )
                })
                }   
            </div>
        </ul>
    )
}
