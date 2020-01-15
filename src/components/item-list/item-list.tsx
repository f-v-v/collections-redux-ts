import React from 'react'
import {ICollectionUser} from '../../types/collections-user'

type ListProps = {
    collections: ICollectionUser[]
}

const ItemList: React.FC<ListProps> = ({collections}) => {
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

export default ItemList