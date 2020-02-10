import React from 'react';
import Spinner from '../components/spinner'
import ErrorIndictor from '../components/error-indicator'

interface WithLoadingProps {
  isLoading: boolean;
  isError:string| null
}
const withIsLoadingError = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => ({
  isLoading, isError,
  ...props
}: WithLoadingProps) => {
  // debugger
  // console.log('compoent', <Component {...props as P} />)
  // console.log('isLoading', isLoading) // Вызывается 3 раза c false, потом только с true. Почему?
  // console.log('isError', isError)
  if (isLoading) {
    return <Spinner /> 
  }
  if (isError !==null) {
    return <ErrorIndictor error={isError}/>
  }
  return <Component {...props as P} />;
}

export default withIsLoadingError
// function withIsLoading<P extends WithLoadingProps>(Component: React.ComponentType<P>) {
//   const Inner: React.FC<P> = props => { // the return type is inferred by the compiler
//     if (props.isLoading) {
//       return (
//         <Spinner />
//         )
//       }
//       return <Component {...props} />
//     }
    
//     return Inner // return type is React.FC<P>
//   }
  