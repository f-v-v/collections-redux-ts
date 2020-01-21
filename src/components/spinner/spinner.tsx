import React from 'react';
import './spinner.css';

const Spinner = () => {
    return (
    <div className="fancy-spinner">
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="dot"></div>
    </div>);
}

export default Spinner;