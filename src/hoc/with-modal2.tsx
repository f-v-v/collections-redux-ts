import React from 'react';

type ShadowInjected<T1, T2> = Omit<T1, keyof T2>;

interface HOCProps {
  show: boolean,
  // onClose:() => void,
}

// interface Props extends Object {
// }

// interface modal {
//   show: boolean,
//   onClose:() => void,
// }

// export const withModal =<T,> (
//   Component: React.ComponentType<ShadowInjected<T, HOCProps>>
// ): React.FC<T> => 
// {
//   // return function (props: ShadowInjected<T, HOCProps>) {
//   return function (props: T) {
//       // Do you HOC work here
//       const {show, ...ownProps } = props
//       let styles = show
//       ? { display: "block" }
//       : { display: "none" };
//       return (
//               <div className="modal fade show" style={styles}>
//                 <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
//                     <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" >Modal title</h5>
//                         {/* <button type="button" 
//                                 className="close" 
//                                 data-dismiss="modal"
//                                 onClick={props.onClose}    
//                             >
//                             <span>&times;</span>
//                         </button> */}
//                     </div>
//                       <div className="modal-body">
//                           <div className="container-fluid">
//                             <Component {...ownProps as ShadowInjected<T, HOCProps>} /> 
//                           </div>
//                       </div>
//                     </div>
//                 </div>
//               </div>
//             )
//   }
// }
