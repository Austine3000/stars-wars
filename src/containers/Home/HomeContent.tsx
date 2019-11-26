import React from 'react';

const HomeContent: React.FC = () => {
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <h1>Home Content</h1>
      </React.Suspense>
    </React.Fragment>
  );
};

export default HomeContent;
