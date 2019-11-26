import React from 'react';

const HomeContent = React.lazy(() => import('./HomeContent'));

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </React.Suspense>
    </React.Fragment>
  );
};

export default HomePage;
