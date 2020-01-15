import React from 'react'
import {ICollection} from '../../interfeices/collection'

type ListProps = {
    collections: ICollection[]
}

const ItemList: React.FC<ListProps> = ({collections}) => {
    return (
        <ul className="collection">
            {collections.map((item, index) => {
                return(
                    <li className="collection-item">
                        <div className={"row " + (item.active?'':' red')}>
                            
                            <div className="valign-wrapper">
        
                            <div className="col s1">{index}</div>
                            <div className="col s3 ">{item.name}</div>
                            <div className="col s1">{item.type}</div>
                            <div className="col s1">{item.questions}</div>
                            <div className="col s2">
                                <a className={'btn-small ' + ((item.edit && item.own)?'':'disabled') 
                                        }>Редактировать</a>
                            </div>
                            <div className="col s2">
                                <a className={'btn-small ' + (item.own?'':'disabled')
                                        }>Разрешения</a>
                            </div>
                            <div className="col s2">
                                <a className={"btn-small " + (item.edit?"":"disabled" )
                                        }>Состав</a>
                            </div>
                            </div>

                        </div>
                    </li>
                )
            })

            }

        </ul>
      
    )
}

export default ItemList