import React from 'react';
import ErrorIndicator from '../components/error-indicator'

interface WithErrorProps {
  error: string|null;
}

const withIsError = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithErrorProps> => ({
  error,
  ...props
}: WithErrorProps) => {
  debugger
  return  (error !==null) ? <ErrorIndicator error={error} /> : <Component {...props as P} />
}

export default withIsError