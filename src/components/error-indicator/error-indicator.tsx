import React from 'react';
import './error-indicator.css'

type Props = {
    error: string;
}

const ErrorIndicator:React.FC<Props> = ({error}) => {
    return (<div className="jumbotron">
            <span>Oh, Error: {error}</span> 
         </div>);
}

export default ErrorIndicator;