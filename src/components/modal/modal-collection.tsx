import React from 'react'
import { ICollection } from '../../types/collection'
import { Collection } from '../collection/collection'

type ownProps = {
    show: boolean,
    collection:ICollection,
    onClose:() => void,
    onSave: (collection:ICollection) => void
}

export const Modal:React.FC<ownProps> = (props) => {
    
    let styles = props.show
      ? { display: "block" }
      : { display: "none" };
    return (
        <div className="modal fade show" style={styles}>
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" >Modal title</h5>
                <button type="button" 
                        className="close" 
                        data-dismiss="modal"
                        onClick={props.onClose}    
                    >
                    <span>&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="container-fluid">
                    <Collection 
                        collection={props.collection} 
                        onSave={props.onSave}
                        onClose={props.onClose}
                    />
                </div>
            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
            </div>
        </div>
        </div>
    )
}
