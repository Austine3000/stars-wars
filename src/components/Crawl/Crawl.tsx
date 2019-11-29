import React from 'react';
import './Crawl.scss';

interface IProps {
  credits: string;
}

const Crawl: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <div id="target">
        <p>{props.credits}</p>
      </div>
    </>
  );
};

export default Crawl;
