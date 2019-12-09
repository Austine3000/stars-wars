import React, { useState } from 'react';
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
    <ErrorBoundary>
      <ThemeProvider theme={checked ? lightTheme : darkTheme}>
        <Navigation toggleTheme={toggleTheme} checked={checked} />
        <GlobalStyles />
        <React.Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </React.Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
