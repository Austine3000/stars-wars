import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './containers/Home/HomePage';

import ErrorBoundary from './common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Route exact path="/" component={HomePage} />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
