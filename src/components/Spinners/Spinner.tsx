import React from 'react';
import { Loader } from './Loader';
import './Spinner.scss';

const Spinner: React.FC = props => {
  return (
    <>
      <div className="spinner-area">
        <Loader className="loader"></Loader>
      </div>
    </>
  );
};

export default Spinner;
