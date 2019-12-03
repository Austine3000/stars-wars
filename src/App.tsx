import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './utils/theme';
import { GlobalStyles } from './utils/global';
import Navigation from './common/Navigation';

import ErrorBoundary from './common/ErrorBoundary';

const HomePage = React.lazy(() => import('./containers/Home/HomePage'));

const App: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const toggleTheme = () => {
    setChecked(!checked);
  };
  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider theme={checked ? lightTheme : darkTheme}>
          <Navigation toggleTheme={toggleTheme} checked={checked} />

          <GlobalStyles />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={HomePage} />
          </React.Suspense>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
