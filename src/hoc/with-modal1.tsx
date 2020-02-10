import React from 'react';

// type modal = {
//   show: boolean,
//   onClose:() => void,
// }

// type = Omit<Todo, 'description'>;
type ShadowInjected<T1, T2> = Omit<T1, keyof T2>;
// interface Props extends Object {
// }

interface modal {
  show: boolean,
  // onClose:() => void,
}

// type T = Omit <modal, 'show'>
export const withModal =<T extends modal> (
  Component: React.ComponentType<ShadowInjected<T, modal>>
) => (props: T
) => {
  const {show, ...ownProps} = props as modal
  let styles = show
  ? { display: "block" }
  : { display: "none" };
  return (
    <div className="modal fade show" style={styles}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" >Modal title</h5>
              {/* <button type="button" 
                      className="close" 
                      data-dismiss="modal"
                      onClick={props.onClose}    
                  >
                  <span>&times;</span>
              </button> */}
          </div>
            <div className="modal-body">
                <div className="container-fluid">
                  <Component {...ownProps as ShadowInjected<T, modal>} /> 
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}