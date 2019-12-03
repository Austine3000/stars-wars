import React from 'react';
import { CrawlWrapper } from './CrawlWrapper';
import './Crawl.scss';

interface IProps {
  credits: string;
}

const Crawl: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <CrawlWrapper>
        <p>{props.credits}</p>
      </CrawlWrapper>
    </>
  );
};

export default Crawl;
