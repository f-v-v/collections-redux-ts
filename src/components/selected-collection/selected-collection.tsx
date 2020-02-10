import React from 'react'
import { ICollection } from '../../types/collection'

type Props = {
    collection:ICollection | null
}

const SelectedCollection:React.FC <Props> = (props) => {
    const {collection} = props
    const selectedCollection:string = collection === null ? "Коллекция не выбрана": "Выбрана коллекция: "+collection.name
    return (
        <div>
            <span className="">{selectedCollection} </span>
        </div>
    )
}

export default React.memo(SelectedCollection)