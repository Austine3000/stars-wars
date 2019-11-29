import React from 'react';
import './Spinner.scss';

const Spinner: React.FC = props => {
  return (
    <>
      <div className="spinner-area">
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Spinner;
