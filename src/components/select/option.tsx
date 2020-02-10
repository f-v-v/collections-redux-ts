import React from 'react'

interface Props {
    id:number;
    name: string;
}

const Option: React.FC<Props> = (props) => {
    // console.log('i in options')
    const {id, name} = props;
        return <option value={id}>{name}</option>
}
export default React.memo(Option);