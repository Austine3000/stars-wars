import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ErrorBoundary from './common/ErrorBoundary';

const HomePage = React.lazy(() => import('./containers/Home/HomePage'));

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={HomePage} />
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
