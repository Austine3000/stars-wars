import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './containers/Home/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
    </Router>
  );
};

export default App;
