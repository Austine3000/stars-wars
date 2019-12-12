import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/theme';
import { GlobalStyles } from './utils/global';

import ErrorBoundary from './common/ErrorBoundary';

import HomePage from './containers/Home/HomePage';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles />
        <React.Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </React.Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
